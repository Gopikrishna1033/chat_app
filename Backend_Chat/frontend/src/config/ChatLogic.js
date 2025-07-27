export const getSender=(loggedUser,users)=>{
return users[0]?._id === loggedUser?._id ? users[1]?.name :users[0]?.name
}
export const getSenderImageType = (loggedUser,users)=>{
return users[0]?._id === loggedUser?._id
  ? users[1]?.imageType
  : users[0]?.imageType;
}
export const getSenderImage = (loggedUser, users)=>{
    return users[0]?._id === loggedUser?._id
      ? users[1]?.image
      : users[0]?.image;
}