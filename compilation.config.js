module.exports = function printCompilationMessage(status, port) {
  const messages = {
    compiling: `🔄 Compiling application...`,
    success: `✅ Application running at http://localhost:${port}`,
    failure: `❌ Compilation failed. Check the terminal for errors.`
  };

  console.log('\n' + '='.repeat(50));
  console.log(messages[status] || 'Unknown status');
  console.log('='.repeat(50) + '\n');
};
