import stripAnsi from "strip-ansi"
import figures from "figures"
import chalk from "chalk"
import Fix from "src/Fix"
import {isString, isFunction} from "lodash"
import hasContent from "has-content"

export default class {

  /**
   * @type {string}
   */
  name = "Tester"

  /**
   * @type {Function}
   * This should be overriden
   */
  async test() {
    return true
  }

  /**
   * @type {import("src/Fix").default[]}
   */
  fixes = []

  setName(ansiName) {
    this.ansiName = ansiName
    this.name = stripAnsi(ansiName)
  }

  setFunction(testFunction) {
    this.test = testFunction
  }

  hasFix() {
    return hasContent(this.fixes)
  }

  /**
   * @param {import("./index").ProjectInfo} projectInfo
   * @return {Promise<boolean>}
   */
  async run(projectInfo) {
    const result = await this.test(projectInfo)
    if (result !== true) {
      let icon = chalk.red(figures.cross)
      if (projectInfo.shouldFix) {
        if (isFunction(this.collectFixes)) {
          this.collectFixes()
        }
        for (const fix of this.fixes) {
          await fix.apply()
        }
        icon = "🔧"
      }
      console.log(`${icon} ${this.ansiName}`)
      if (isString(result)) {
        console.log(result)
      }
      return false
    }
    console.log(`${chalk.green(figures.tick)} ${this.ansiName}`)
    return true
  }

  addFix(fileName, content) {
    const fix = new Fix(fileName, content)
    fix.tester = this
    this.fixes.push(fix)
  }

}