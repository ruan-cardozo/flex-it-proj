interface ImagePros{
    filePath: string;
}

function HomePageImage({filePath}: ImagePros){

    return (
        <img src={filePath} alt="home-page-image" />
    ); 
}

export default HomePageImage;