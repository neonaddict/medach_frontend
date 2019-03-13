module.exports = {
  apps : [
    {
      name: "nuxt",
      script: "./node_modules/nuxt/bin/nuxt-start",
      env: {
          "HOST": "206.189.193.126",
          "NODE_ENV": "production",
          "BASE_URL": 'http://neonaddict.me'
      }
    }
  ]
}

