import React from "react";
import { Modal } from "antd";

const ModalBasic = ({ visible, titleModal, contentModal, setVisible }) => {
  return (
    <Modal
      centered
      closeIcon
      visible={visible}
      destroyOnClose
      title={titleModal}
      onCancel={() => setVisible(false)}
      footer={false}
    >
      {contentModal}
    </Modal>
  );
};

export default ModalBasic;
