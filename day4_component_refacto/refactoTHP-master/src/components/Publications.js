import React, { useState } from 'react'
import { Avatar, Button, Card, Col, Icon, Row, Modal, List, Tag, Input, message } from 'antd/es';
import PublicationsModal from './PublicationsModal';

const Publications = ({ profileData, setProfileData }) => {
  const [previewItem, setPreviewItem] = useState(0)
  const [previewPublicationModal, setPreviewPublicationModal] = useState(false)

  const openPreview = (postNumber) => {
    setPreviewItem(postNumber)
    setPreviewPublicationModal(true)
  }


  return (
    <>
      <PublicationsModal previewPublicationModal={previewPublicationModal} setPreviewPublicationModal={setPreviewPublicationModal} previewItem={previewItem} />
      <Row type="flex" justify="center">
        <Col sm={18} xs={24}>
          <Col span={24} className="container text-center">
            <h2>
              <Icon type="save" />
              <span className="span-icon">Publications</span>
            </h2>
            <Card bordered className="card-pubs" onClick={() => openPreview(0)}>
              <img src={profileData.posts[0].imageUrl} width={200} height={200} alt={profileData.posts[0].imageUrl} />
            </Card>
            <Card bordered className="card-pubs" onClick={() => openPreview(1)}>
              <img src={profileData.posts[1].imageUrl} width={200} height={200} alt={profileData.posts[1].imageUrl} />
            </Card>
            <Card bordered className="card-pubs" onClick={() => openPreview(2)}>
              <img src={profileData.posts[2].imageUrl} width={200} height={200} alt={profileData.posts[2].imageUrl} />
            </Card>
          </Col>
        </Col>
      </Row>
    </>
  )
}

export default Publications