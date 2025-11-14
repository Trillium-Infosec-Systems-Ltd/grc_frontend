import { useState } from "react";
import { Button, Col, Popconfirm, Popover, Row } from "antd";
import { FilterFilled } from "@ant-design/icons";

const PopoverAction = ({
  screen = "",
  title,
  placement = "bottomRight",
  content = null,
  record = null,
  operations,
  children = (
    <span className="filter-btn" style={{ cursor: "pointer" }}>
      <FilterFilled /> Filter
    </span>
  ),
}) => {
  const [visible, setVisible] = useState(false);

  const { delete: deleteRecord } = operations || {};

  const popoverContent = (
    <Row gutter={[10, 10]} style={{ padding: 10 }}>
      {content?.map((action, index) => {
        
        const handleClick = () => {
          if (action?.type === "delete") {
            deleteRecord(record?.id);
          } else {
            action?.onClick?.(record);
          }
          setVisible(false);
        };

        return (
          <Col span={24} key={`action_label_${index}`}>
            {action?.type === "delete" ? (
              <Popconfirm
                title="Delete"
                description="Are you sure to delete this record?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleClick}
              >
                <span
                  style={{
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  {action?.label}
                </span>
              </Popconfirm>
            ) : (
              <span
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                {action?.label}
              </span>
            )}
          </Col>
        );
      })}
    </Row>
  );

  return (
    <Popover
      content={popoverContent}
      title={title}
      trigger="click"
      open={visible}
      onOpenChange={setVisible}
      placement={placement}
    >
      {children}
    </Popover>
  );
};

export default PopoverAction;
