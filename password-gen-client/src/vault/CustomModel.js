// import React, { useEffect, useState } from "react";
// import Modal from "@mui/material/Modal";
// import { Button, Card, CardHeader, IconButton } from "@mui/material";
// import AddPasswords from "./AddPasswords";
// import SelectInput from "./SelectInput";
// import "./custom-model.css";
// import CloseIcon from "@mui/icons-material/Close";
// import { logDOM } from "@testing-library/react";

// const CustomModel = ({ modelState }) => {
//   console.log(modelState);
//   const [open, setOpen] = useState(false);
//   const handelClose = () => {
//     setOpen(false);
//   };
//   useEffect(() => {
//     setOpen(modelState);
//   }, [modelState]);
//   return (
//     <div>
//       <Modal
//         sx={{}}
//         open={open}
//         // onClose={handleClose}
//         // closeAfterTransition
//         // BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         {/* <AddPasswords /> */}
//         <div className="no--border bg-light h-100 p-4">
//           <div className="close-icon d-flex ml-auto">
//             <IconButton onClick={handelClose} className="ml-auto">
//               <CloseIcon />
//             </IconButton>
//           </div>
//           <AddPasswords />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CustomModel;
