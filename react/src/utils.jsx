export function getImageUrl(person,size='s'){
    return(
        'https://tse4.mm.bing.net/th?id=OIP.BJMgDOd-2_JvPbfhwlB0agHaEK&pid=Api&P=0&h=180'+
        person.imageId+
        size+
        '.jpg'
    );
}