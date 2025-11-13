import jwt from 'jsonwebtoken'



export const generateAccessToken = async(data) =>{
    try {
                console.log(data);

        const {role , email , _id} = data
        console.log(data);
        
        const accessToken = jwt.sign(
            {
            _id,
            email,
            role
        },
        process.env.JWT,
        {expiresIn:'7d'}
    )
       
    const options = {
         httpOnly:true,
        secure:true,
        expire:new Date(Date.now()+ 7*24*60*60*1000),
        sameSite:'strict'
    }
        return {accessToken , options}
    } catch (error) {
        console.log('error in generating token');
        
    }
}