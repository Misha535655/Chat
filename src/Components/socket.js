import { actionMesseges } from "../store/actions";
import store from "../store/store";
const socket = window.io("chat.ed.asmer.org.ua");
if (localStorage.authToken) socket.emit("jwt", localStorage.authToken);
socket.on("msg", (msg) => store.dispatch(actionMesseges(msg.chat._id)));
socket.on("chat", (chat) => console.log(chat));
export default socket;
