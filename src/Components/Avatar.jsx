import React from 'react'
function getUrl(avatar, localUrl) {
    if (localUrl) {
        return localUrl
    } else if (avatar) {
        return 'http://chat.ed.asmer.org.ua/' + avatar
    } else {
        return false
    }
}
function Avatar({avatar, localUrl}) {
    console.log(localUrl)
    console.log(avatar)
  return (
    <div onClick={() => {}} className="img_cont d-flex align-items-center">
    <img src={getUrl(avatar, localUrl) ? getUrl(avatar, localUrl) : "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"} className="rounded-circle user_img"/>
    <p className='p-3'>Avatar</p>
</div>
  )
}

export default Avatar