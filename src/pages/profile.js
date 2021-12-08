import { useEffect } from "react";
import Image from "../avatar.png";
import Camera from "../svg/camera";
import Delete from "../svg/delete";
import { useState } from "react";
import { storage, auth } from "../firebase";
import db from "../firebase";

const Profile = () => {
    const [img, setimage] = useState('');
    const [user, setuser] = useState();
    const handlechange = (e) => {
        setimage(e.target.files[0]);
        console.log(img);
    }

const deleteimg = async()=>{
    try{
        const confirm = window.confirm("Deleting Avatar");
        if(confirm){
            const storageref = storage.ref();
        const imgref = storageref.child(`${user.avatarpath}`);
        await imgref.delete();
        await db.collection('users').doc(auth.currentUser.uid).update({
            avatar: "",
            avatarpath: ""
        });
        }
        console.log(user.avatarpath);
    }catch(err){
        console.log(err);
    }
}

    useEffect(() => {
        db.collection('users').onSnapshot((snap)=>{
            snap.forEach((doc)=>{
                if(doc.data().uid === auth.currentUser.uid)
                setuser(doc.data());
                // console.log(user);
            })
        })
     if(img) {
            const Upload = async () => {
                const imgRef = storage.ref(`avatar/${new Date().getTime()} ${img.name}`);
                try {
                    if(user.avatarpath){
                        const storageref = storage.ref();
                        const imgref = storageref.child(`${user.avtarpath}`);
                        await imgref.delete();
                    }
                    const snap = await imgRef.put(img);
                    const url = await imgRef.getDownloadURL();
                    await db.collection('users').doc(auth.currentUser.uid).update({
                        avatar: url,
                        avatarpath: snap.ref.fullPath
                    });
                    setimage('');
                    console.log(url);
                } catch (err) {
                    console.log(err);
                }
            }
            Upload();
        }
    }, [img])
    return <section>
        {user?
        <div className="profile_container">
            <div className="img_container">
                <img src={  user.avatar || Image } alt="avtar" />
                <div className="overlay">
                    <label htmlFor="photo">
                        <Camera />
                    </label>
                    {user.avatar?<Delete deleteimg={deleteimg}/>:null}
                    <input type="file" accept="image/*" style={{ display: "none" }} id="photo" onChange={handlechange} />
                </div>
            </div>
            <div className="text_container">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <hr />
                <small>Joined on : {user.createdAt}</small>
            </div>
        </div>
    :<div>Loading...</div>} 
    </section>
}
export default Profile;