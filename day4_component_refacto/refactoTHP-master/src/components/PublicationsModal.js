import React, { useState } from 'react'
import { Button, Col, Row, Modal, List, Tag } from 'antd/es';
import profileData from '../datas/profileData.json'

const PublicationsModal = ({ previewPublicationModal, setPreviewPublicationModal, previewItem }) => {

  const updatePic = () => {
    alert("J'update la publcation avec l'id : " + profileData.posts[previewItem].id);
  }

  const deletePic = () => {
    alert("Je supprime la publcation avec l'id : " + profileData.posts[previewItem].id);
  }

  return (
    <Modal width={520} visible={previewPublicationModal} onCancel={() => setPreviewPublicationModal(false)}
      footer={<Row type="flex">
        <Col span={12} className="text-center">
          <Button type="ghost" icon="edit" onClick={updatePic}>Edit</Button>
        </Col>
        <Col span={12} className="text-center">
          <Button type="danger" icon="delete" onClick={deletePic}>Delete</Button>
        </Col>
      </Row>}
    >
      <Row type="flex" align="middle">
        <Col xs={24} md={12} className="text-center">
          <img src={profileData.posts[previewItem].imageUrl} width={200} height={200} alt={profileData.posts[previewItem].description} />
        </Col>
        <Col xs={24} md={12}>
          <div>
            <b>Description: </b>
            <p>{profileData.posts[previewItem].description}</p>
          </div>
          <div>
            <b>Hashtag:</b>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={profileData.posts[previewItem].hashtags}
              renderItem={(tag) => (
                <List.Item>
                  <Tag>{`${tag}`}</Tag>
                </List.Item>
              )}
            />
          </div>
          <div>
            <b>Mention:</b>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={profileData.posts[previewItem].mentions}
              renderItem={(user) => (
                <List.Item>
                  <Tag>{`@${user}`}</Tag>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default PublicationsModal