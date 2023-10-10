const jwt = require("jsonwebtoken");

module.exports.generatedToken = async(data)=>{
  try{
    const access_token =  await jwt.sign(
      {data},
      process.env.ACCESS_SECRET_KEY,
      {expiresIn:"1d"}
    )

    const refresh_token = await jwt.sign(
      { data },
      process.env.REFRESH_SEKRET_KEY,
      { expiresIn: "1y" }
    );

    return { access_token, refresh_token };
  } catch (err) {
    console.log(err);
  }
}