import { useState } from "react"
import { useAppSelector } from "../../../lib/hooks"

const CopyClip = ({ value }: {value: string}) => {
    const darkMode = useAppSelector(state => state.general.darkMode)
    const [copied, setCopied] = useState(false)

    const copy = () => {

        /* Get the text field */
        var copyText = document.getElementById("myInput");

        // /* Select the text field */
        (copyText as any).select();
        (copyText as any).setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText((copyText as HTMLInputElement).value);
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }
    return (
        <>
            {
                !copied ? (
                    <div title="copy to clipboard" onClick={copy}>
                        <svg className="copy" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path fill={darkMode ? '#fff' : "grey"} d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z" /></svg>
                    </div>
                ) : (
                    <div title="copied" className="ml-3">
                        <i style={{fontStyle: 'italic', color: 'green'}}>
                           copied 
                        </i>
                        
                    </div>
                )
            }

            <input style={{display: "none"}} type="text" value={value} id="myInput"></input>
        </>

    )
}

export default CopyClip