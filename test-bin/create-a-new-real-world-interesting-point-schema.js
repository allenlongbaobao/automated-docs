(function(){
  var createANewRealWorldInterestingPointSchema;
  createANewRealWorldInterestingPointSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      createdInterestingPoint: {
        type: 'object',
        description: '新建兴趣点的基本数据',
        additionalProperties: false,
        required: true,
        properties: {
          type: {
            description: '兴趣点类型',
            type: 'string',
            required: true,
            'enum': ['web', 'real']
          },
          title: {
            description: '兴趣点标题',
            type: 'string',
            required: true
          },
          content: {
            description: '兴趣点内容',
            type: 'string',
            required: true
          },
          withinLocation: {
            description: '所在的位置信息',
            type: 'object',
            additionalProperties: false,
            required: true,
            properties: {
              type: {
                description: '位置类型',
                type: 'string',
                'enum': ['web', 'real'],
                required: true
              },
              atPosition: {
                description: '兴趣点的绝对位置信息',
                type: 'object',
                additionalProperties: false,
                required: true,
                properties: {
                  isExist: {
                    description: '位置是否存在',
                    type: 'boolean',
                    required: true
                  },
                  positionWithinRealWorldLocation: {
                    description: '真实世界位置信息',
                    type: 'object',
                    additionalProperties: false,
                    required: true,
                    properties: {
                      longitude: {
                        description: '经度',
                        type: 'number',
                        required: true
                      },
                      latitude: {
                        description: '纬度',
                        type: 'number',
                        required: true
                      },
                      altitude: {
                        description: '高度',
                        type: 'number',
                        required: true
                      }
                    }
                  }
                }
              }
            }
          },
          isPrivate: {
            description: '兴趣点是否是私有的',
            type: 'boolean',
            required: true
          },
          sharedWith: {
            description: '兴趣点分享用户',
            type: 'array',
            required: true,
            item: {
              description: '用户id',
              type: 'string'
            }
          },
          pictures: {
            description: '兴趣点对应的图片',
            type: 'array',
            required: true,
            minItems: 1,
            items: {
              description: '图片信息',
              type: 'object',
              additionalProperties: false,
              properties: {
                type: {
                  description: '图片类型',
                  type: 'string',
                  required: true,
                  'enum': ['photo', 'snapshot']
                },
                url: {
                  description: '图片地址',
                  type: 'string',
                  required: true
                },
                highlights: {
                  description: '图片亮点数组',
                  type: 'array',
                  required: true,
                  items: {
                    description: '亮点信息',
                    type: 'object',
                    additionalProperties: false,
                    required: true,
                    properties: {
                      offset: {
                        description: '亮点相对图片的偏移量',
                        type: 'object',
                        additionalProperties: false,
                        required: true,
                        properties: {
                          x: {
                            description: '偏移x轴的值',
                            type: 'number',
                            required: true
                          },
                          y: {
                            description: '偏移y轴的值',
                            type: 'number',
                            required: true
                          }
                        }
                      },
                      size: {
                        description: '亮点大小信息',
                        type: 'object',
                        additionalProperties: false,
                        required: true,
                        properties: {
                          width: {
                            description: '宽度',
                            type: 'number',
                            required: true
                          },
                          height: {
                            description: '高度',
                            type: 'number',
                            required: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          tags: {
            description: '兴趣点标签',
            type: 'array',
            required: true,
            items: {
              description: '标签id',
              type: 'string'
            }
          }
        }
      },
      selectedLocations: {
        type: 'array',
        description: '用户选择的地理位置',
        required: true,
        minItems: 1,
        items: {
          type: 'object',
          description: '每个地理位置的信息',
          additionalProperties: false,
          required: true,
          properties: {
            longitude: {
              description: '经度',
              type: 'number',
              required: true
            },
            latitude: {
              description: '纬度',
              type: 'number',
              required: true
            },
            altitude: {
              description: '高度',
              type: 'number',
              required: true
            },
            address: {
              description: '地理位置的地址名称',
              type: 'string',
              required: true
            }
          }
        }
      }
    }
  };
}).call(this);
