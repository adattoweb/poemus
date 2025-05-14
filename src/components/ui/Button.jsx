export default function Button({children, href, onClick}){
    // if(!href) href = "#"
    if(!onClick) onClick = () => console.log("Button clicked")
    if(href){
        return (
            <a href={href} onClick={onClick} className="button mona">
                {children}
         </a>)
    }
    else{
        return (
            <div onClick={onClick} className="button mona">
                {children}
            </div>)
    }
}