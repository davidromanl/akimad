import { Col, Row, Card, Avatar } from "antd";

export default function Users(props) {
  const { users } = props;

  return (
    <>
      <Row gutter={[16, 16]} wrap>
        {users.map((user, index) => {
          return (
            <Col xs={12} md={6} key={index}>
              <Card
                onClick={() => {
                  props.setUser(user);
                }}
                hoverable
                size="small"
              > <Avatar src={user.avatar_url} size={50} />
                <strong>{user.login}</strong>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
