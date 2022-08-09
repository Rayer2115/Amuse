const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async (client) => {

  const eventFiles = await globPromise(`${process.cwd()}/Events/*.js`);
  eventFiles.map((value) => {
    require(value)
    let replaced = value.replace(` C:/Users/N3gat/Documents/Amuse/Events/`, ``).replace(`.js`, ``)
    client.logger.info(`Załadowano event ${replaced}`)
  });

  const slashCommands = await globPromise(
    `${process.cwd()}/Commands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    const properties = { directory, ...file };
    
    if (!file?.name) return;
    client.slashCommands.set(file.name, properties);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    arrayOfSlashCommands.push(file);
    client.logger.info(`Załadowano komendę ${file.name}`)
  });
  client.on("ready", async () => {
      // await client.guilds.cache
      //   .get(`963108480632385618`)
      //   .commands.set(arrayOfSlashCommands);

      await client.application.commands.set(arrayOfSlashCommands);
  });
};