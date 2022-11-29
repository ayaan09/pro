import React, { Component, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import '../globalmessage/globalUI.css'

function Registration (props) {
const [sid, changesid] = useState('')
const [firstname, changefirstname] = useState('')
const [lastname, changelastname] = useState('')
const [major, changemajor] = useState('')
const [gpa, changegpa] = useState(1)
const [email, changeemail] = useState('')
const [year, changeyear] = useState(1)
const [degree, changedegree] = useState('Undergraduate')
const [options, changeoptions] = useState('')



function handleSIDChange (event) {
		changesid(event.target.value)
	}

function handleFirstnameChange (e){
	changefirstname(e.target.value)
	}

function handleLastnameChange (e){
	changelastname(e.target.value)
	}

function handleEmailChange (e){
	changeemail(e.target.value)
	}

function handleMajorChange (e){
	changemajor(e.target.value)
	}

function handleDegreeChange (e){
	changedegree(e.target.value)
	}

function handleYearChange (e){
	changeyear(e.target.value)
	}

function handleGPAChange (e){
	changegpa(e.target.value)
	}

function handleOptionsChange (e){
	changeoptions(e.target.value)
	}


function handleSubmit (event){
		event.preventDefault()
		console.log(sid)
		
		axios.post('https://sunnysocial.herokuapp.com/api/auth/registration',{
			sid:   sid,
			firstname:   firstname,
			lastname:   lastname,
			major:   major,
			gpa:   gpa,
			email:   email,
			year :   year,
			degree:   degree,
			options:   options
		})
		.then((response) =>{
		response.status===201&&alert('Success!')} )
		.then((result) => {
		console.log('next ::: ',result)
		})
		
	}


		return (
			<div className='tutor-form'>
			<form onSubmit={ handleSubmit}>
				<div>
					<label>SID </label>
					<input
						type="text"
						value={sid}
						onChange={  handleSIDChange} required
					/>
				</div>
				<div>
					<label>First Name </label>
					<input
						type="text"
						value={firstname}
						onChange={  handleFirstnameChange} required
					/>
				</div>
				<div>
					<label>Last Name </label>
					<input
						type="text"
						value={lastname}
						onChange={  handleLastnameChange} required
					/>
				</div>
				<div>
					<label>CUHK Email Adress </label>
					<input
						type="email"
						value={email}
						onChange={  handleEmailChange} required
					/>
				</div>
				<div>
					<label>Major </label>
					<input
						type="text"
						value={major}
						onChange={  handleMajorChange} required
					/>
				</div>
				
				<div>
					<label>Level of Study</label>
					<select value={degree} onChange={  handleDegreeChange} required>
						<option value="undergraduate">Undergraduate</option>
						<option value="masters">Masters</option>
						<option value="phd">PhD</option>
					</select>
				</div>
				<div>
					<label >GPA</label>
					<input type="number" min="1" max="4" step="0.01" 
						value={gpa}
						onChange={  handleGPAChange} required/>
           		 </div>
				<div>
					<label>Year of Study</label>
					<select value={year} onChange={  handleYearChange} required>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div>
            <label>Courses you want to teach</label>
                <select value={options} onChange={handleOptionsChange} required>
				<option value="Engineering">Engineering</option>
				<option value="Science">Science</option>
				<option value="Arts">Arts</option>
				<option value="Social Science">Social Science</option>
				<option value="English">English</option>
				</select>
            </div>
            
				<button className='btn btn-success' type="submit" style={{marginTop:'28px'}} onSubmit={  handleSubmit}>Submit</button>
			</form>
			</div>
		)
	}

export default Registration