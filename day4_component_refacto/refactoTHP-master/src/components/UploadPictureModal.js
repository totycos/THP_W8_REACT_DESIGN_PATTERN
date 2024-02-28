import React, { useState } from 'react'
import MentionsTagsComponent from './MentionsTagsComponent';
import { Col, Row, Modal, Input } from 'antd/es';

const UploadPictureModal = ({ uploadModal, setUploadModal }) => {
  const [description, setDescription] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [mentions, setMentions] = useState('')


  const uploadPicture = () => {
    alert("J'upload une image avec la description : " + description + " et les hashtags " + hashtags + " et les mentions " + mentions);
  }

  const updateMentions = (value) => {
    this.setState({ mentions: value });
  }

  const updateHashtags = (value) => {
    this.setState({ hashtags: value })
  }

  return (
    <Modal title="Upload a picture" okText="Upload" visible={uploadModal} onOk={uploadPicture} onCancel={() => setUploadModal(false)}>
      <Row type="flex" justify="center" className="input-container">
        <Col span={20}>
          <b>Description:</b>
          <Input id="description" title="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Col>
      </Row>
      <MentionsTagsComponent type="mentions" value={mentions} title="Mention a user" setValue={updateMentions} />
      <MentionsTagsComponent type="tags" value={hashtags} title="Hashtags" setValue={updateHashtags} />
    </Modal>
  )
}

export default UploadPictureModal