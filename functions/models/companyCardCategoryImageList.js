const mongoose = require('mongoose');
const companyCardCategoryImageListSchema = new mongoose.Schema({
        cardShortBgURL: {
          type: String
        },
        cardLongBgURL: {
          type: String
        },
        cardImageURL: {
          type: String
        },
        cardImageURL2: {
          type: String
        },
        cardImageURL3: {
          type: String
        },
        cardImageURL4: {
          type: String
        },
        categoryId: {
            type: String
        },
        cardName: {
          type: String
        },
        cardDesignType: {
          type: String
        },
        locationStyling: {
          fontSize: {
            type: String
          },
          alignment: {
            type: String
          },
          fontColor: {
            type: Date
          },
          fontStyle: {
            type: String
          },
          fontWeight: {
            type: String
          }
        },
        titleStyling: {
          fontSize: {
            type: String
          },
          alignment: {
            type: String
          },
          fontColor: {
            type: Date
          },
          fontStyle: {
            type: String
          },
          fontWeight: {
            type: String
          }
        },
        userNameStyling: {
          noOfLines: {
            type: Date
          },
          fontSize: {
            type: Date
          },
          alignment: {
            type: String
          },
          fontColor: {
            type: String
          },
          fontStyle: {
            type: String
          },
          fontWeight: {
            type: String
          }
        },
        actionIcons: {
          type: {
            type: String
          },
          backgroundColor: {
            type: String
          },
          iconColor: {
            type: String
          },
          alignment: {
            type: String
          },
          opacity: {
            type: Date
          }
        },
        cardCreatedDate: {
          type: Date
        },
        cardCreatorUserName: {
          type: Date
        },
        cardCreatorUserId: {
          type: String
        },
        profileDesignInfo: {
          designType: {
            type: String
          },
          errorTextColor: {
            type: String
          },
          primaryColor: {
            type: String
          },
          secondaryColor: {
            type: String
          },
          textColor: {
            type: Date
          },
          profileBannerImageURL: {
            type: String
          },
          opacity: {
            primary: {
              type: Date
            },
            secondary: {
              type: Date
            }
          }
        }
},{ timestamps: true });

module.exports = mongoose.model("companyCardCategoryImageList", companyCardCategoryImageListSchema);