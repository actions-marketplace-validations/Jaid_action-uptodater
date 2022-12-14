import path from "node:path"

import fsp from "@absolunet/fsp"

import chalk from "../lib/chalk.js"
import Tester from "../Tester.js"

export default class extends Tester {

  /**
   * @type {string}
   */
  file = null

  constructor(file) {
    super()
    this.file = path.resolve(file)
    this.shortFile = file
    this.setTitle(`${chalk.yellow(this.shortFile)} should not exist`)
  }

  /**
   * @param {import("src/index").ProjectInfo} projectInfo
   * @return {Promise<Pick<boolean, string>>}
   */
  async test() {
    const exists = await fsp.pathExists(this.file)
    if (exists) {
      return `${this.shortFile} does exist`
    }
    return true
  }

  collectFixes() {
    this.addFix(this.shortFile, false)
  }


}