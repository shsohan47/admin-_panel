export default function error(err)
{
    const error = err?.response?.data;
    
    if(Array.isArray(error))
    {
        return error[1];
    }else{
        if(typeof error == "object")
        {
                return error.details;
        }
        else{
            return error
        }
    }


}
