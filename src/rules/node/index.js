import Rule from "../../Rule"
import FileExists from "../../testers/FileExists"
import FileShouldNotExist from "../../testers/FileShouldNotExist.js"
import PkgFieldExact from "../../testers/PkgFieldExact"

export default new class extends Rule {

  title = "Node"

  init() {
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
    this.addTester(new FileShouldNotExist("index.js"))
    this.addTester(new FileExists("tsconfig.json"))
    this.addTester(new FileShouldNotExist("jsconfig.json"))
    this.addTester(new FileShouldNotExist("tsconfigBase.json"))
  }

}