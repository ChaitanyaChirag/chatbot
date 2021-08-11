import React from "react"
import PropTypes from "prop-types"
import Upload from "antd/lib/upload"
import AddFileIcon from "react-icons/lib/md/add-circle"

const UploadFile = ({ beforeUpload, onRemove }) => (
  <div className="ori-animated ori-fade-in ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc">
    <Upload
      accept="image/*"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
    >
      <AddFileIcon
        size={20}
        className="ori-font-light-hover-default"
      />
    </Upload>
  </div>
)

UploadFile.propTypes = {
  beforeUpload: PropTypes.func,
  onRemove: PropTypes.func
}

export default UploadFile
