const dynamic = async () => {
  // Accept plugin name as CLI argument
  // Dynamically import plugin from plugins/ directory
  // Call run() function and print result
  // Handle missing plugin case
  const plugin = process.argv[2];

  if (!plugin) {
    console.error("Please specify a plugin name using CLI argument");
    return;
  }
  try {
    const pluginModule = await import(`./plugins/${plugin}.js`);
    const result = await pluginModule.run();
    console.log(result);
  } catch (err) {
    console.error(`Plugin not found ${plugin}`);
    process.exit(1);
  }
};

await dynamic();
