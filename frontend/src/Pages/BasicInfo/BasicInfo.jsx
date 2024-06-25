import React from 'react'
import './BasicInfo.scss'

function BasicInfo() {
  return (
    <div className="basicInfo-container">
            <h2>Signup Form</h2>
            <form>
                <div className="form-group">
                    <label >First Name</label>
                    <input type="text" id="firstName" name="firstName" />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="form-group">
                    <label >Location</label>
                    <input type="text" id="location" name="location" />
                </div>
                <div className="form-group">
                    <label >Date of Birth</label>
                    <input type="date" id="dob" name="dob" />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div className="radio-buttons">
                        <label>
                            <input type="radio" name="gender" value="male" />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" />
                            Female
                        </label>
                    </div>
                </div>
                <button type="submit" className="next-button">Next</button>
            </form>
        </div>
  )
}

export default BasicInfo