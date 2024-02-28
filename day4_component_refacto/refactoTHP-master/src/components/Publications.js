import React, { useState } from 'react'
import { Col, Icon, Row, List } from 'antd/es';
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
            <List
              bordered
              dataSource={profileData.posts}
              renderItem={(item) => (
                <List.Item onClick={() => openPreview(item.id - 1)}>
                  <img src={item.imageUrl} width={200} height={200} alt={item.imageUrl} />
                </List.Item>
              )}
            />
          </Col>
        </Col>
      </Row>
    </>
  )
}

export default Publications