import Attach from "../svg/attach"

const Messageform = (props) =>{
const {handlesubmit,text,settext,setimg} = props;
    return <>
    <form className="message-form" onSubmit={handlesubmit}>
    <label htmlFor="img">
    <Attach/>
    </label>
    <input type="file" id="img" accept="image/*" style={{display:"none"}} onChange={e=>setimg(e.target.files[0])} />
    <div>
        <input type="text" value={text} onChange={(e)=>settext(e.target.value)}/>
    </div>
    <div>
        <button className="btn">send</button>
    </div>
    </form>
    </>
}
export default Messageform;