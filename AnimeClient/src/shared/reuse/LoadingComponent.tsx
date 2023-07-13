

interface Props{
    message? : string
}
export default function LoadingComponent({message ='Loading....'} : Props){
    return(
        <>
        <div className="flex flex-col justify-center items-center space-x-2 w-full h-[26rem] bg-[#000000c4] z-20 text-gray-300">
  <div className="spinner-border animate-spin inline-block w-20 h-20 my-2 border-4 border-t-red-700 rounded-full " role="status">
    
  </div>
  <span className="visually-hidden">{message}</span>
  </div>

        {/*
        
        justify-content: center;
    align-items: center;
    background: #000000c7;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 110;
        
        <Backdrop open={true} invisible={true}
        
        sx={{
            height:200,
            position:'relative'
        }}
        >
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={100} color='secondary'></CircularProgress>
                <Typography variant='h4' sx={{justifyContent:'center', position:'relative'}}>{message}</Typography>
            </Box>
    </Backdrop>*/}
    </>
    )
}