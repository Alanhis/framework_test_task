
export function getAuthor(){
   return fetch('https://test-front.framework.team/authors').then(data => data.json())
}

export function getLocation(){
    return fetch('https://test-front.framework.team/locations').then(data => data.json())
}
export function getPaints(props){
    console.log(props)
    return fetch('https://test-front.framework.team/paintings?'+ new URLSearchParams(props)).then(data => data.json())
}