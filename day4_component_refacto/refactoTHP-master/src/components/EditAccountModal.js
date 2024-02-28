import React, { useState } from 'react'
import { Col, Row, Modal, Input, message } from 'antd/es';
import profileData from '../datas/profileData.json'


const EditAccountModal = ({ editProfilModal, setEditProfilModal, setProfileData }) => {
  const [email, setEmail] = useState('myprofile@thp.fr')
  const [firstname, setFirstname] = useState('TheHacking')
  const [lastname, setLastname] = useState('Project')
  const [phoneNumber, setPhoneNumber] = useState('0601020304')

  const updateProfile = () => {
    let tmp = profileData;
    tmp.email = email;
    tmp.firstname = firstname;
    tmp.lastname = lastname;
    tmp.phoneNumber = phoneNumber;
    setProfileData(tmp)
    setEditProfilModal(false)
    message.success('Profile well updated', 3);
  }

  return (
    <Modal title="Edit your account" okText="Update" visible={editProfilModal} onOk={updateProfile} onCancel={() => setEditProfilModal(false)}>
      <Row type="flex" justify="center" className="input-container">
        <Col span={20}>
          <b>EMail</b>
          <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Col>
      </Row>
      <Row type="flex" justify="center" className="input-container">
        <Col span={20}>
          <b>Firstname</b>
          <Input id="firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </Col>
      </Row>
      <Row type="flex" justify="center" className="input-container">
        <Col span={20}>
          <b>Lastname</b>
          <Input id="lastname" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </Col>
      </Row>
      <Row type="flex" justify="center" className="input-container">
        <Col span={20}>
          <b>Phone number</b>
          <Input id="email" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Col>
      </Row>
    </Modal>
  )
}

export default EditAccountModal