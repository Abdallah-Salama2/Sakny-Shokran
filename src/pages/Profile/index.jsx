import React, { useState } from "react";

const UserInfo = ({ userInfo, updateUserInfo }) => {
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInfo = {
      name: e.target.name.value,
      email: e.target.email.value,
      birthdate: e.target.birthdate.value,
      gender: e.target.gender.value,
    };
    updateUserInfo(updatedInfo);
    setEditMode(false);
  };

  if (!userInfo) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h2>User Information</h2>
        </div>
        <div className="card-body">
          <p>
            You are not signed in. Please fill in your information to continue.
          </p>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">
                  Birthdate
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="birthdate"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select className="form-select" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Add Info
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2>User Information</h2>
      </div>
      <div className="card-body">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                defaultValue={userInfo.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                defaultValue={userInfo.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthdate" className="form-label">
                Birthdate
              </label>
              <input
                type="date"
                className="form-control"
                name="birthdate"
                defaultValue={userInfo.birthdate}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                name="gender"
                defaultValue={userInfo.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Birthdate:</strong> {userInfo.birthdate}
            </p>
            <p>
              <strong>Gender:</strong> {userInfo.gender}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit Info
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
