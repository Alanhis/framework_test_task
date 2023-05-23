
export function getAuthor(){
   return fetch('https://test-front.framework.team/authors').then(data => data.json())
}

export function getLocation(){
    return fetch('https://test-front.framework.team/locations').then(data => data.json())
}
export function getPaints(props){
    return fetch('https://test-front.framework.team/paintings'+ props).then(data => data.json())
}