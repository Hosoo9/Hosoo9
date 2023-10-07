module.exports = {
  apps: [
    {
      name: "ariel_prod",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      //instances: 1,
      //exec_mode: "cluster"
    },
  ],
};
