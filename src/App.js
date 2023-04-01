import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUers, deleteUsers, updateUsers } from "./reducers/usersReducer";

const initialState = {
  id: null,
  username: ""
};
const App = () => {
  const [userDetail, setUserDetail] = useState(initialState);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserDetail({
      ...userDetail,
      username: e.target.value
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const obj = {
      id: Math.floor(Math.random() * 1000),
      username: userDetail.username
    };
    if (userDetail.isEdit) {
      dispatch(updateUsers(userDetail));
      setUserDetail(initialState);
    } else {
      dispatch(addUers(obj));
      setUserDetail(initialState);
    }
  };

  const handleUpdate = (id) => {
    const findUsers = users.find((d) => d.id === id);
    setUserDetail({
      id: findUsers.id,
      username: findUsers.username,
      isEdit: id
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteUsers(id));
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={userDetail.username}
          placeholder="Enter Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="submit"
          value={userDetail.isEdit ? "update" : "Add"}
          onClick={handleAdd}
        />
      </form>
      {users &&
        users.map((d) => {
          return (
            <div key={d.id}>
              <h2>{d.username}</h2>
              <button onClick={() => handleUpdate(d.id)}>Update</button>
              <button onClick={() => handleDelete(d.id)}>Delete</button>
            </div>
          );
        })}
    </>
  );
};

export default App;
