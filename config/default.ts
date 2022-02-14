export default {
  port: 1414,
  host: 'localhost',
  databaseUri: 'mongodb://localhost:27017/yemek',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  jwtPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIBOAIBAAJARXQg/ToGVh1j8qCfFjUNb0FMPIUU1JHOxxCc5EiGbaz8uLvk1Rm8
  rC5DOCiptrNMdmizr2qROKrckOSTnqwoKQIDAQABAkA46qkaPBHzQlSlAeI9Za6j
  zOQ3+GuQpAjLc57PKWwYtj8bC6i0nyBz8bfGXLAPB4vCdROy/X9kETGXYyFwQwgx
  AiEAighNBKu+3slNiH8nw2/1ZXVcTFgBrBLjTv2P/W1u9k0CIQCAz63n1tYXtt8q
  0sKRxAsc4YmGuq2YJ5oyFln0aDvfTQIgXECqAPosSkfuKtEZKVS1hQbIFjone/Lv
  uwZa6vzt0W0CIFJulUgMgC3k5aQuBD3sS4BMBQqnZHg+v7rV+vMh0U7xAiAus8cZ
  bd9s5PH6wepqC62prlNwwQ4wT8gn97jXhzqiuQ==
  -----END RSA PRIVATE KEY-----`,
};
