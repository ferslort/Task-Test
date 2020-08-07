import React, { useState } from 'react';
import Filter from './Filter';
import ListTask from './ListTask';
import FormTask from './FormTask';
import { Button } from 'antd';
import ModalBasic from '../ModalBasic';
import {PlusOutlined } from '@ant-design/icons';


const Content = () => {

    const [visible, setVisible] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [contentModal, setContentModal] = useState('');

    const showForm = () => {
        setVisible(true);
        setTitleModal('Nueva Tarea');
        setContentModal(<FormTask  setVisible={setVisible}/>)
    }

    return (
      <div className="container-content">
        <Filter />
        <ListTask />
        <div className="container-content__footer" onClick={showForm}>
          <Button type="primary"><PlusOutlined  style={{ fontSize: '30px', color: '#fff', fontWeight: 'bold' }}/></Button>
        </div>
        <ModalBasic
          visible={visible}
          titleModal={titleModal}
          contentModal={contentModal}
          setVisible={setVisible}
        />
      </div>
    );
}
 
export default Content;