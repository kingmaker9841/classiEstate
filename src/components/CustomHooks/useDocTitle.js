import {useEffect} from 'react';
function useDocTitle(name) {
    useEffect(()=>{
        document.title = `${name}`
    })
}

export default useDocTitle
