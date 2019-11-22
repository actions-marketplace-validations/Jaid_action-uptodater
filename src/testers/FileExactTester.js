import path from "path"

import fsp from "@absolunet/fsp"
import Tester from "src/testers/Tester"
import hasha from "hasha"
import chalk from "chalk"

export default class extends Tester {

  /**
   * @type {string}
   */
  expectedHash = null

  /**
   * @type {string}
   */
  file = null

  constructor(file, expectedContent) {
    super()
    this.expectedContent = expectedContent
    this.expectedHash = hasha(expectedContent, {
      algorithm: "md5",
    })
    this.file = path.resolve(file)
    this.shortFile = file
    this.setName(`${chalk.yellow(this.shortFile)} should have md5 ${chalk.yellow(this.expectedHash)}`)
  }

  async test() {
    const exists = await fsp.pathExists(this.file)
    if (!exists) {
      console.log(`${this.shortFile} does not exist`)
      return false
    }
    const actualHash = await hasha.fromFile(this.file, {
      algorithm: "md5",
    })
    if (actualHash === this.expectedHash) {
      return true
    }
    console.log(`They are not equal, got hash ${actualHash} from file`)
    return false
  }

  collectFixes() {
    this.addFix(this.shortFile, this.expectedContent)
  }

}