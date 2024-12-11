
import { Layout, Row, Col, Typography, Space } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterLayout = () => {
    return (
        <Footer style={{ backgroundColor: "#001529", color: "#fff", padding: "40px 20px" }}>
            <div className="container lg:ml-48">
                <Row gutter={[16, 24]}>
                    {/* Column 1 */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: "#fff" }}>About Us</Title>
                        <Text style={{ color: "#ccc" }}>
                            We are committed to providing top-notch services to our users, ensuring satisfaction and reliability at every step.
                        </Text>
                    </Col>

                    {/* Column 2 */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: "#fff" }}>Quick Links</Title>
                        <Space direction="vertical">
                            <a href="/" style={{ color: "#ccc" }}>Home</a>
                            <a href="/about" style={{ color: "#ccc" }}>About</a>
                            <a href="/services" style={{ color: "#ccc" }}>Services</a>
                            <a href="/contact" style={{ color: "#ccc" }}>Contact</a>
                        </Space>
                    </Col>

                    {/* Column 3 */}
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} style={{ color: "#fff" }}>Contact Us</Title>
                        <Space direction="vertical">
                            <Text style={{ color: "#ccc" }}>Email: support@example.com</Text>
                            <Text style={{ color: "#ccc" }}>Phone: +123 456 789</Text>
                            <Text style={{ color: "#ccc" }}>Address: 123 Main Street, City, Country</Text>
                        </Space>
                    </Col>
                </Row>
            </div>
            <Row justify="center" style={{ marginTop: "40px" }}>
                <Col>
                    <Space size="large">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined style={{ fontSize: "24px", color: "#fff" }} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <TwitterOutlined style={{ fontSize: "24px", color: "#fff" }} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <InstagramOutlined style={{ fontSize: "24px", color: "#fff" }} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined style={{ fontSize: "24px", color: "#fff" }} />
                        </a>
                    </Space>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: "20px" }}>
                <Col>
                    <Text style={{ color: "#ccc" }}>
                        © {new Date().getFullYear()} Your Company. All Rights Reserved.
                    </Text>
                </Col>
            </Row>
        </Footer>
    );
};

export default FooterLayout;
