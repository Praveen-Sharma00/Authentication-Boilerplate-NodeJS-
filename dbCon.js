const mongoose = require('mongoose')

global.URL=process.env.DATABASE_URL.replace('<password>',process.env.DATABASE_PASSWORD)

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
  })
  .then(() => console.log('DB connection successful!'));