import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { usersFetchRequest, usersDeleteRequest, usersUpdateStatusRequest } from "../actions";
import { Loader } from "../../../Common/Loader";
import { Table, Button, Icon } from "antd";
import style from "./index.module.scss";
import { status } from '../../../../constants/status';

export const Users = props => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [blockButtonDisabled, setBlockButtonDisabled] = React.useState(false);
  const [activateButtonDisabled, setActivateButtonDisabled] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersFetchRequest());
  }, [dispatch]);

  useEffect(() => {
    const selectedUsers = props.users.filter(user => selectedRowKeys.includes(user._id));

    setActivateButtonDisabled(!selectedUsers.every(user => user.status === status.blocked));
    setBlockButtonDisabled(!selectedUsers.every(user => user.status === status.active));
  }, [props.users, selectedRowKeys]);


  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Creation date",
      dataIndex: "creationDate",
      key: "creationDate"
    },
    {
      title: "Last login date",
      dataIndex: "lastLoginDate",
      key: "lastLoginDate"
    },
  ];

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const start = async () => {
    setLoadingButton(true);
    await dispatch(usersDeleteRequest(selectedRowKeys))
    setLoadingButton(false);
    setSelectedRowKeys([]);
  };

  const changeStatus = async (status) => {
    setLoadingButton(true);
    await dispatch(usersUpdateStatusRequest(selectedRowKeys, status))
    setLoadingButton(false);
    setSelectedRowKeys([]);
  }

  const activate = async () => changeStatus(status.active);

  const block = async () => changeStatus(status.blocked);

  return (
    <div>
      <h1>Users</h1>
      <div style={{ marginBottom: 16 }}>
        <Button
          style={{ marginLeft: 8 }}
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loadingButton || props.isLoading}>
          <Icon type="delete" style={{ color: "rgba(0,0,0,.25)" }}/>
        </Button>
        <Button style={{ marginLeft: 8 }} type="primary" onClick={block} disabled={!hasSelected || blockButtonDisabled}
                loading={loadingButton || props.isLoading}>
          <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>
        </Button>
        <Button style={{ marginLeft: 8 }} type="primary" onClick={activate}
                disabled={!hasSelected || activateButtonDisabled} loading={loadingButton || props.isLoading}>
          <Icon type="unlock" style={{ color: "rgba(0,0,0,.25)" }}/>
        </Button>
        <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
      </div>
      <div className={style.usersList}>
        <Loader isLoading={props.isLoading}>
          <Table
            columns={columns}
            dataSource={props.users}
            rowKey="_id"
            rowSelection={rowSelection}
          />
        </Loader>
      </div>
    </div>
  );
};

Users.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array,
  usersFetchRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.cabinet.users.isLoading,
  users: state.cabinet.users.data
});

export const UsersContainer = withRouter(
  connect(
    mapStateToProps
  )(Users)
);
