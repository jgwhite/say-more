module.exports = function(babel) {
  const { types: t } = babel;

  return {
    name: 'keyboard-click-plugin',
    visitor: {
      CallExpression(path) {
        if (isTest(path.node) && containsClick(path.node)) {
          let keyboardTest = generateKeyboardTest(path.node);
          path.parentPath.insertAfter(t.expressionStatement(keyboardTest));
          // TODO: Generate import statement
        }
      }
    }
  };
}

function isTest(node) {
  return node.callee.name === 'test';
}

function containsClick(node) {
  let [, fun] = node.arguments;
  if (!fun) { return false; }
  let { body } = fun.body;
  return body.some(isClick);
}

function isClick(node) {
  switch (node.type) {
    case 'ExpressionStatement':
      return isClick(node.expression);
    case 'AwaitExpression':
      return isClick(node.argument);
    case 'CallExpression':
      return node.callee.name === 'click';
    default:
      return false;
  }
}

function generateKeyboardTest(node) {
  let [origLabel, origFun] = node.arguments;
  let label = {
    ...origLabel,
    value: origLabel.value + ' (with the keyboard)'
  };  
  let fun = {
    ...origFun,
    body: {
     ...origFun.body,
     body: origFun.body.body.map(clickToKeyboard)
    }
  };
  let result = {
    ...node,
    arguments: [label, fun]
  };

  return result;
}

function clickToKeyboard(node) {
  switch (node.type) {
    case 'ExpressionStatement':
      return { ...node, expression: clickToKeyboard(node.expression) };
    case 'AwaitExpression':
      return { ...node, argument: clickToKeyboard(node.argument) };
    case 'CallExpression':
      if (node.callee.name === 'click') {
        return { ...node, callee: { ...node.callee, name: 'keyboardClick' } };
      } else {
        return node;
      }
    default:
      return node;
  }
}

module.exports.baseDir = function() {
  return 'keyboard-click-babel-plugin';
};
