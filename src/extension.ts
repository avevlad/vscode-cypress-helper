// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-cypress-helper" is now active!'
  )

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'vscode-cypress-helper.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed

      let editor = vscode.window.activeTextEditor
      if (!editor) {
        return
      }

      let logValue = editor.document.getText(editor.selection)

      const { selection, document } = editor

      console.log(selection)
      console.log(document)
      editor.edit((editBuilder) => {
        console.log('selection.active.character', selection.active.character)
        editBuilder.replace(
          new vscode.Range(
            new vscode.Position(selection.active.line, 0),
            new vscode.Position(selection.active.line, 9999999999)
          ),
          'привет vscode'
        )
      })
      vscode.window.showInformationMessage(logValue)
    }
  )

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
