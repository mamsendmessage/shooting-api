
CREATE TABLE [GameType] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [GameType] VALUES ('Normal')
INSERT INTO [GameType] VALUES ('Special sessions')
INSERT INTO [GameType] VALUES ('Competition')

GO

CREATE TABLE  [Nationality] ( [NumCode] int NOT NULL DEFAULT '0' PRIMARY KEY, [Alpha2Code] varchar(2) DEFAULT NULL,
  [Alpha3Code] varchar(3) DEFAULT NULL, [ShortName_en] varchar(52) DEFAULT NULL, [NationalityName] varchar(39) DEFAULT NULL,
)
GO
INSERT INTO Nationality ([NumCode], [Alpha2Code], [Alpha3Code], [ShortName_en], [NationalityName]) VALUES
(4, 'AF', 'AFG', 'Afghanistan', 'Afghan'),
(248, 'AX', 'ALA', 'Åland Islands', 'Åland Island'),
(8, 'AL', 'ALB', 'Albania', 'Albanian'),
(12, 'DZ', 'DZA', 'Algeria', 'Algerian'),
(16, 'AS', 'ASM', 'American Samoa', 'American Samoan'),
(20, 'AD', 'AND', 'Andorra', 'Andorran'),
(24, 'AO', 'AGO', 'Angola', 'Angolan'),
(660, 'AI', 'AIA', 'Anguilla', 'Anguillan'),
(10, 'AQ', 'ATA', 'Antarctica', 'Antarctic'),
(28, 'AG', 'ATG', 'Antigua and Barbuda', 'Antiguan or Barbudan'),
(32, 'AR', 'ARG', 'Argentina', 'Argentine'),
(51, 'AM', 'ARM', 'Armenia', 'Armenian'),
(533, 'AW', 'ABW', 'Aruba', 'Aruban'),
(36, 'AU', 'AUS', 'Australia', 'Australian'),
(40, 'AT', 'AUT', 'Austria', 'Austrian'),
(31, 'AZ', 'AZE', 'Azerbaijan', 'Azerbaijani, Azeri'),
(44, 'BS', 'BHS', 'Bahamas', 'Bahamian'),
(48, 'BH', 'BHR', 'Bahrain', 'Bahraini'),
(50, 'BD', 'BGD', 'Bangladesh', 'Bangladeshi'),
(52, 'BB', 'BRB', 'Barbados', 'Barbadian'),
(112, 'BY', 'BLR', 'Belarus', 'Belarusian'),
(56, 'BE', 'BEL', 'Belgium', 'Belgian'),
(84, 'BZ', 'BLZ', 'Belize', 'Belizean'),
(204, 'BJ', 'BEN', 'Benin', 'Beninese, Beninois'),
(60, 'BM', 'BMU', 'Bermuda', 'Bermudian, Bermudan'),
(64, 'BT', 'BTN', 'Bhutan', 'Bhutanese'),
(68, 'BO', 'BOL', 'Bolivia (Plurinational State of)', 'Bolivian'),
(535, 'BQ', 'BES', 'Bonaire, Sint Eustatius and Saba', 'Bonaire'),
(70, 'BA', 'BIH', 'Bosnia and Herzegovina', 'Bosnian or Herzegovinian'),
(72, 'BW', 'BWA', 'Botswana', 'Motswana, Botswanan'),
(74, 'BV', 'BVT', 'Bouvet Island', 'Bouvet Island'),
(76, 'BR', 'BRA', 'Brazil', 'Brazilian'),
(86, 'IO', 'IOT', 'British Indian Ocean Territory', 'BIOT'),
(96, 'BN', 'BRN', 'Brunei Darussalam', 'Bruneian'),
(100, 'BG', 'BGR', 'Bulgaria', 'Bulgarian'),
(854, 'BF', 'BFA', 'Burkina Faso', 'Burkinabé'),
(108, 'BI', 'BDI', 'Burundi', 'Burundian'),
(132, 'CV', 'CPV', 'Cabo Verde', 'Cabo Verdean'),
(116, 'KH', 'KHM', 'Cambodia', 'Cambodian'),
(120, 'CM', 'CMR', 'Cameroon', 'Cameroonian'),
(124, 'CA', 'CAN', 'Canada', 'Canadian'),
(136, 'KY', 'CYM', 'Cayman Islands', 'Caymanian'),
(140, 'CF', 'CAF', 'Central African Republic', 'Central African'),
(148, 'TD', 'TCD', 'Chad', 'Chadian'),
(152, 'CL', 'CHL', 'Chile', 'Chilean'),
(156, 'CN', 'CHN', 'China', 'Chinese'),
(162, 'CX', 'CXR', 'Christmas Island', 'Christmas Island'),
(166, 'CC', 'CCK', 'Cocos (Keeling) Islands', 'Cocos Island'),
(170, 'CO', 'COL', 'Colombia', 'Colombian'),
(174, 'KM', 'COM', 'Comoros', 'Comoran, Comorian'),
(178, 'CG', 'COG', 'Congo (Republic of the)', 'Congolese'),
(180, 'CD', 'COD', 'Congo (Democratic Republic of the)', 'Congolese'),
(184, 'CK', 'COK', 'Cook Islands', 'Cook Island'),
(188, 'CR', 'CRI', 'Costa Rica', 'Costa Rican'),
(384, 'CI', 'CIV', 'Côte dIvoire', 'Ivorian'),
(191, 'HR', 'HRV', 'Croatia', 'Croatian'),
(192, 'CU', 'CUB', 'Cuba', 'Cuban'),
(531, 'CW', 'CUW', 'Curaçao', 'Curaçaoan'),
(196, 'CY', 'CYP', 'Cyprus', 'Cypriot'),
(203, 'CZ', 'CZE', 'Czech Republic', 'Czech'),
(208, 'DK', 'DNK', 'Denmark', 'Danish'),
(262, 'DJ', 'DJI', 'Djibouti', 'Djiboutian'),
(212, 'DM', 'DMA', 'Dominica', 'Dominican'),
(214, 'DO', 'DOM', 'Dominican Republic', 'Dominican'),
(218, 'EC', 'ECU', 'Ecuador', 'Ecuadorian'),
(818, 'EG', 'EGY', 'Egypt', 'Egyptian'),
(222, 'SV', 'SLV', 'El Salvador', 'Salvadoran'),
(226, 'GQ', 'GNQ', 'Equatorial Guinea', 'Equatorial Guinean, Equatoguinean'),
(232, 'ER', 'ERI', 'Eritrea', 'Eritrean'),
(233, 'EE', 'EST', 'Estonia', 'Estonian'),
(231, 'ET', 'ETH', 'Ethiopia', 'Ethiopian'),
(238, 'FK', 'FLK', 'Falkland Islands (Malvinas)', 'Falkland Island'),
(234, 'FO', 'FRO', 'Faroe Islands', 'Faroese'),
(242, 'FJ', 'FJI', 'Fiji', 'Fijian'),
(246, 'FI', 'FIN', 'Finland', 'Finnish'),
(250, 'FR', 'FRA', 'France', 'French'),
(254, 'GF', 'GUF', 'French Guiana', 'French Guianese'),
(258, 'PF', 'PYF', 'French Polynesia', 'French Polynesian'),
(260, 'TF', 'ATF', 'French Southern Territories', 'French Southern Territories'),
(266, 'GA', 'GAB', 'Gabon', 'Gabonese'),
(270, 'GM', 'GMB', 'Gambia', 'Gambian'),
(268, 'GE', 'GEO', 'Georgia', 'Georgian'),
(276, 'DE', 'DEU', 'Germany', 'German'),
(288, 'GH', 'GHA', 'Ghana', 'Ghanaian'),
(292, 'GI', 'GIB', 'Gibraltar', 'Gibraltar'),
(300, 'GR', 'GRC', 'Greece', 'Greek, Hellenic'),
(304, 'GL', 'GRL', 'Greenland', 'Greenlandic'),
(308, 'GD', 'GRD', 'Grenada', 'Grenadian'),
(312, 'GP', 'GLP', 'Guadeloupe', 'Guadeloupe'),
(316, 'GU', 'GUM', 'Guam', 'Guamanian, Guambat'),
(320, 'GT', 'GTM', 'Guatemala', 'Guatemalan'),
(831, 'GG', 'GGY', 'Guernsey', 'Channel Island'),
(324, 'GN', 'GIN', 'Guinea', 'Guinean'),
(624, 'GW', 'GNB', 'Guinea-Bissau', 'Bissau-Guinean'),
(328, 'GY', 'GUY', 'Guyana', 'Guyanese'),
(332, 'HT', 'HTI', 'Haiti', 'Haitian'),
(334, 'HM', 'HMD', 'Heard Island and McDonald Islands', 'Heard Island or McDonald Islands'),
(336, 'VA', 'VAT', 'Vatican City State', 'Vatican'),
(340, 'HN', 'HND', 'Honduras', 'Honduran'),
(344, 'HK', 'HKG', 'Hong Kong', 'Hong Kong, Hong Kongese'),
(348, 'HU', 'HUN', 'Hungary', 'Hungarian, Magyar'),
(352, 'IS', 'ISL', 'Iceland', 'Icelandic'),
(356, 'IN', 'IND', 'India', 'Indian'),
(360, 'ID', 'IDN', 'Indonesia', 'Indonesian'),
(364, 'IR', 'IRN', 'Iran', 'Iranian, Persian'),
(368, 'IQ', 'IRQ', 'Iraq', 'Iraqi'),
(372, 'IE', 'IRL', 'Ireland', 'Irish'),
(833, 'IM', 'IMN', 'Isle of Man', 'Manx'),
(376, 'IL', 'ISR', 'Israel', 'Israeli'),
(380, 'IT', 'ITA', 'Italy', 'Italian'),
(388, 'JM', 'JAM', 'Jamaica', 'Jamaican'),
(392, 'JP', 'JPN', 'Japan', 'Japanese'),
(832, 'JE', 'JEY', 'Jersey', 'Channel Island'),
(400, 'JO', 'JOR', 'Jordan', 'Jordanian'),
(398, 'KZ', 'KAZ', 'Kazakhstan', 'Kazakhstani, Kazakh'),
(404, 'KE', 'KEN', 'Kenya', 'Kenyan'),
(296, 'KI', 'KIR', 'Kiribati', 'I-Kiribati'),
(408, 'KP', 'PRK', 'Korea (Democratic Peoples Republic of)', 'North Korean'),
(410, 'KR', 'KOR', 'Korea (Republic of)', 'South Korean'),
(414, 'KW', 'KWT', 'Kuwait', 'Kuwaiti'),
(417, 'KG', 'KGZ', 'Kyrgyzstan', 'Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz'),
(418, 'LA', 'LAO', 'Lao Peoples Democratic Republic', 'Lao, Laotian'),
(428, 'LV', 'LVA', 'Latvia', 'Latvian'),
(422, 'LB', 'LBN', 'Lebanon', 'Lebanese'),
(426, 'LS', 'LSO', 'Lesotho', 'Basotho'),
(430, 'LR', 'LBR', 'Liberia', 'Liberian'),
(434, 'LY', 'LBY', 'Libya', 'Libyan'),
(438, 'LI', 'LIE', 'Liechtenstein', 'Liechtenstein'),
(440, 'LT', 'LTU', 'Lithuania', 'Lithuanian'),
(442, 'LU', 'LUX', 'Luxembourg', 'Luxembourg, Luxembourgish'),
(446, 'MO', 'MAC', 'Macao', 'Macanese, Chinese'),
(807, 'MK', 'MKD', 'Macedonia (the former Yugoslav Republic of)', 'Macedonian'),
(450, 'MG', 'MDG', 'Madagascar', 'Malagasy'),
(454, 'MW', 'MWI', 'Malawi', 'Malawian'),
(458, 'MY', 'MYS', 'Malaysia', 'Malaysian'),
(462, 'MV', 'MDV', 'Maldives', 'Maldivian'),
(466, 'ML', 'MLI', 'Mali', 'Malian, Malinese'),
(470, 'MT', 'MLT', 'Malta', 'Maltese'),
(584, 'MH', 'MHL', 'Marshall Islands', 'Marshallese'),
(474, 'MQ', 'MTQ', 'Martinique', 'Martiniquais, Martinican'),
(478, 'MR', 'MRT', 'Mauritania', 'Mauritanian'),
(480, 'MU', 'MUS', 'Mauritius', 'Mauritian'),
(175, 'YT', 'MYT', 'Mayotte', 'Mahoran'),
(484, 'MX', 'MEX', 'Mexico', 'Mexican'),
(583, 'FM', 'FSM', 'Micronesia (Federated States of)', 'Micronesian'),
(498, 'MD', 'MDA', 'Moldova (Republic of)', 'Moldovan'),
(492, 'MC', 'MCO', 'Monaco', 'Monégasque, Monacan'),
(496, 'MN', 'MNG', 'Mongolia', 'Mongolian'),
(499, 'ME', 'MNE', 'Montenegro', 'Montenegrin'),
(500, 'MS', 'MSR', 'Montserrat', 'Montserratian'),
(504, 'MA', 'MAR', 'Morocco', 'Moroccan'),
(508, 'MZ', 'MOZ', 'Mozambique', 'Mozambican'),
(104, 'MM', 'MMR', 'Myanmar', 'Burmese'),
(516, 'NA', 'NAM', 'Namibia', 'Namibian'),
(520, 'NR', 'NRU', 'Nauru', 'Nauruan'),
(524, 'NP', 'NPL', 'Nepal', 'Nepali, Nepalese'),
(528, 'NL', 'NLD', 'Netherlands', 'Dutch, Netherlandic'),
(540, 'NC', 'NCL', 'New Caledonia', 'New Caledonian'),
(554, 'NZ', 'NZL', 'New Zealand', 'New Zealand, NZ'),
(558, 'NI', 'NIC', 'Nicaragua', 'Nicaraguan'),
(562, 'NE', 'NER', 'Niger', 'Nigerien'),
(566, 'NG', 'NGA', 'Nigeria', 'Nigerian'),
(570, 'NU', 'NIU', 'Niue', 'Niuean'),
(574, 'NF', 'NFK', 'Norfolk Island', 'Norfolk Island'),
(580, 'MP', 'MNP', 'Northern Mariana Islands', 'Northern Marianan'),
(578, 'NO', 'NOR', 'Norway', 'Norwegian'),
(512, 'OM', 'OMN', 'Oman', 'Omani'),
(586, 'PK', 'PAK', 'Pakistan', 'Pakistani'),
(585, 'PW', 'PLW', 'Palau', 'Palauan'),
(275, 'PS', 'PSE', 'Palestine, State of', 'Palestinian'),
(591, 'PA', 'PAN', 'Panama', 'Panamanian'),
(598, 'PG', 'PNG', 'Papua New Guinea', 'Papua New Guinean, Papuan'),
(600, 'PY', 'PRY', 'Paraguay', 'Paraguayan'),
(604, 'PE', 'PER', 'Peru', 'Peruvian'),
(608, 'PH', 'PHL', 'Philippines', 'Philippine, Filipino'),
(612, 'PN', 'PCN', 'Pitcairn', 'Pitcairn Island'),
(616, 'PL', 'POL', 'Poland', 'Polish'),
(620, 'PT', 'PRT', 'Portugal', 'Portuguese'),
(630, 'PR', 'PRI', 'Puerto Rico', 'Puerto Rican'),
(634, 'QA', 'QAT', 'Qatar', 'Qatari'),
(638, 'RE', 'REU', 'Réunion', 'Réunionese, Réunionnais'),
(642, 'RO', 'ROU', 'Romania', 'Romanian'),
(643, 'RU', 'RUS', 'Russian Federation', 'Russian'),
(646, 'RW', 'RWA', 'Rwanda', 'Rwandan'),
(652, 'BL', 'BLM', 'Saint Barthélemy', 'Barthélemois'),
(654, 'SH', 'SHN', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Helenian'),
(659, 'KN', 'KNA', 'Saint Kitts and Nevis', 'Kittitian or Nevisian'),
(662, 'LC', 'LCA', 'Saint Lucia', 'Saint Lucian'),
(663, 'MF', 'MAF', 'Saint Martin (French part)', 'Saint-Martinoise'),
(666, 'PM', 'SPM', 'Saint Pierre and Miquelon', 'Saint-Pierrais or Miquelonnais'),
(670, 'VC', 'VCT', 'Saint Vincent and the Grenadines', 'Saint Vincentian, Vincentian'),
(882, 'WS', 'WSM', 'Samoa', 'Samoan'),
(674, 'SM', 'SMR', 'San Marino', 'Sammarinese'),
(678, 'ST', 'STP', 'Sao Tome and Principe', 'São Toméan'),
(682, 'SA', 'SAU', 'Saudi Arabia', 'Saudi, Saudi Arabian'),
(686, 'SN', 'SEN', 'Senegal', 'Senegalese'),
(688, 'RS', 'SRB', 'Serbia', 'Serbian'),
(690, 'SC', 'SYC', 'Seychelles', 'Seychellois'),
(694, 'SL', 'SLE', 'Sierra Leone', 'Sierra Leonean'),
(702, 'SG', 'SGP', 'Singapore', 'Singaporean'),
(534, 'SX', 'SXM', 'Sint Maarten (Dutch part)', 'Sint Maarten'),
(703, 'SK', 'SVK', 'Slovakia', 'Slovak'),
(705, 'SI', 'SVN', 'Slovenia', 'Slovenian, Slovene'),
(90, 'SB', 'SLB', 'Solomon Islands', 'Solomon Island'),
(706, 'SO', 'SOM', 'Somalia', 'Somali, Somalian'),
(710, 'ZA', 'ZAF', 'South Africa', 'South African'),
(239, 'GS', 'SGS', 'South Georgia and the South Sandwich Islands', 'South Georgia or South Sandwich Islands'),
(728, 'SS', 'SSD', 'South Sudan', 'South Sudanese'),
(724, 'ES', 'ESP', 'Spain', 'Spanish'),
(144, 'LK', 'LKA', 'Sri Lanka', 'Sri Lankan'),
(729, 'SD', 'SDN', 'Sudan', 'Sudanese'),
(740, 'SR', 'SUR', 'Suriname', 'Surinamese'),
(744, 'SJ', 'SJM', 'Svalbard and Jan Mayen', 'Svalbard'),
(748, 'SZ', 'SWZ', 'Swaziland', 'Swazi'),
(752, 'SE', 'SWE', 'Sweden', 'Swedish'),
(756, 'CH', 'CHE', 'Switzerland', 'Swiss'),
(760, 'SY', 'SYR', 'Syrian Arab Republic', 'Syrian'),
(158, 'TW', 'TWN', 'Taiwan, Province of China', 'Chinese, Taiwanese'),
(762, 'TJ', 'TJK', 'Tajikistan', 'Tajikistani'),
(834, 'TZ', 'TZA', 'Tanzania, United Republic of', 'Tanzanian'),
(764, 'TH', 'THA', 'Thailand', 'Thai'),
(626, 'TL', 'TLS', 'Timor-Leste', 'Timorese'),
(768, 'TG', 'TGO', 'Togo', 'Togolese'),
(772, 'TK', 'TKL', 'Tokelau', 'Tokelauan'),
(776, 'TO', 'TON', 'Tonga', 'Tongan'),
(780, 'TT', 'TTO', 'Trinidad and Tobago', 'Trinidadian or Tobagonian'),
(788, 'TN', 'TUN', 'Tunisia', 'Tunisian'),
(792, 'TR', 'TUR', 'Turkey', 'Turkish'),
(795, 'TM', 'TKM', 'Turkmenistan', 'Turkmen'),
(796, 'TC', 'TCA', 'Turks and Caicos Islands', 'Turks and Caicos Island'),
(798, 'TV', 'TUV', 'Tuvalu', 'Tuvaluan'),
(800, 'UG', 'UGA', 'Uganda', 'Ugandan'),
(804, 'UA', 'UKR', 'Ukraine', 'Ukrainian'),
(784, 'AE', 'ARE', 'United Arab Emirates', 'Emirati, Emirian, Emiri'),
(826, 'GB', 'GBR', 'United Kingdom of Great Britain and Northern Ireland', 'British, UK'),
(581, 'UM', 'UMI', 'United States Minor Outlying Islands', 'American'),
(840, 'US', 'USA', 'United States of America', 'American'),
(858, 'UY', 'URY', 'Uruguay', 'Uruguayan'),
(860, 'UZ', 'UZB', 'Uzbekistan', 'Uzbekistani, Uzbek'),
(548, 'VU', 'VUT', 'Vanuatu', 'Ni-Vanuatu, Vanuatuan'),
(862, 'VE', 'VEN', 'Venezuela (Bolivarian Republic of)', 'Venezuelan'),
(704, 'VN', 'VNM', 'Vietnam', 'Vietnamese'),
(92, 'VG', 'VGB', 'Virgin Islands (British)', 'British Virgin Island'),
(850, 'VI', 'VIR', 'Virgin Islands (U.S.)', 'U.S. Virgin Island'),
(876, 'WF', 'WLF', 'Wallis and Futuna', 'Wallis and Futuna, Wallisian or Futunan'),
(732, 'EH', 'ESH', 'Western Sahara', 'Sahrawi, Sahrawian, Sahraouian'),
(887, 'YE', 'YEM', 'Yemen', 'Yemeni'),
(894, 'ZM', 'ZMB', 'Zambia', 'Zambian'),
(716, 'ZW', 'ZWE', 'Zimbabwe', 'Zimbabwean')

GO



CREATE TABLE [PlayerLevel] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL,[GameTypeId] [bigint] NOT NULL,[Image] [nvarchar] (max) NOT NULL
	FOREIGN KEY (GameTypeId) REFERENCES GameType(ID),
);
INSERT INTO [PlayerLevel] VALUES ('Beginner',1,'assets/img/pyallow.svg')
INSERT INTO [PlayerLevel] VALUES ('Intermediate',1,'assets/img/pblue.svg')
INSERT INTO [PlayerLevel] VALUES ('Professional',1,'assets/img/pgreen.svg')

GO

CREATE TABLE [SessionTime] ( [ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [SessionTime] VALUES ('30')
INSERT INTO [SessionTime] VALUES ('45')
INSERT INTO [SessionTime] VALUES ('60')

GO

CREATE TABLE [Lane]([ID] [bigint] Primary Key IDENTITY(1,1) NOT NULL,[Name] [nvarchar](255) NOT NULL,[Number] [bigint] Unique NOT NULL,[CreationDate] [datetime] NOT NULL)

GO
INSERT INTO [Lane] VALUES ('Lane 1',1, GETDATE())
INSERT INTO [Lane] VALUES ('Lane 2',2, GETDATE())
INSERT INTO [Lane] VALUES ('Lane 3',3, GETDATE())
INSERT INTO [Lane] VALUES ('Lane 4',4, GETDATE())
INSERT INTO [Lane] VALUES ('Lane 5',5, GETDATE())

GO
CREATE TABLE [Screen] ([ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO  [Screen] VALUES ('Dashboard')
INSERT INTO  [Screen] VALUES ('Player')
INSERT INTO  [Screen] VALUES ('Receptionist')
INSERT INTO  [Screen] VALUES ('Ticket')
INSERT INTO  [Screen] VALUES ('Settings')
INSERT INTO  [Screen] VALUES ('Admin Consloe')

CREATE TABLE [Role] ([ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL,[Name] [nvarchar] (max) NOT NULL);
INSERT INTO [Role] VALUES ('Full Role')
GO
CREATE TABLE [Permission] ([ID] [bigint] Primary KEY IDENTITY(1,1) NOT NULL, RoleId bigint NOT NULL, ScreenId bigint NOT NULL
FOREIGN KEY (RoleId) REFERENCES [Role]([ID]),
FOREIGN KEY (ScreenId) REFERENCES [Screen]([ID])
);
GO
INSERT INTO [Permission] VALUES (1,1)
INSERT INTO [Permission] VALUES (1,2)
INSERT INTO [Permission] VALUES (1,3)
INSERT INTO [Permission] VALUES (1,4)
INSERT INTO [Permission] VALUES (1,5)
INSERT INTO [Permission] VALUES (1,6)
GO
CREATE TABLE [dbo].[User]([ID] [bigint] PRIMARY KEY IDENTITY(1,1) NOT NULL, [Name] [nvarchar](255) NOT NULL,[Email] [nvarchar](500) Unique NOT NULL,[Password] [nvarchar](255) NOT NULL,
	[MobileNumber] [nvarchar](255) NOT NULL Unique ,[CreationDate] [datetime] NOT NULL,[RoleId] [bigint] NULL
		FOREIGN KEY (RoleId) REFERENCES [Role]([ID]))

GO

INSERT INTO [USER] VALUES ('Super Admin','admin@hadaf.com','admin','xxxxxxxx',GETDATE(),1)

GO
CREATE TABLE [dbo].[Player]([ID] [bigint] Primary Key IDENTITY(1,1) NOT NULL, [Name] [nvarchar](255) NOT NULL,[NationalityId] int not  NULL, [Age] [int] NULL,
	[MobileNumber] [nvarchar](15) NULL,[Photo] [nvarchar](max) NULL , [Document] varchar(max) not null, [CreationDate] [datetime] NOT NULL,[PassportsNo] varchar(max) NOT NULL
	,[MembershipNo]  varchar(max) NOT NULL,[MembershipExpiry] [datetime] NOT NULL
	FOREIGN KEY (NationalityId) REFERENCES Nationality(NumCode)
	)
GO

CREATE TABLE [dbo].[Ticket]([ID] [bigint] Primary Key IDENTITY(1,1) NOT NULL, [UserId] [bigint] NOT NULL, [LaneId] [bigint] NOT NULL,[GameTypeId] [bigint] NOT NULL,[PlayerLevelId] [bigint],
	[SessionTimeId] [bigint] ,[State] [int] NOT NULL, [TicketType] [int] NOT NULL, [UserType] [int] NOT NULL, [CreationDate] [datetime] NOT NULL,[LastModificationDate] [datetime] NULL,[GamePeriod] [bigint] NULL
	FOREIGN KEY (UserId) REFERENCES [Player](ID),
	FOREIGN KEY (LaneId) REFERENCES Lane(ID),
	FOREIGN KEY (GameTypeId) REFERENCES GameType(ID),
	FOREIGN KEY (PlayerLevelId) REFERENCES PlayerLevel(ID),
	FOREIGN KEY (SessionTimeId) REFERENCES SessionTime(ID)
	)
GO
CREATE VIEW [X_TodayPlayers] AS SELECT 
[Player].[ID] As UserId,
[Ticket].[ID] As TicketId,
[Player].[Photo],
[Player].[Name],
[Ticket].[CreationDate],
[Ticket].[State],
[PlayerLevel].[Name] AS PlayerLevel,
[GameType].[Name] as GameType,
[Ticket].[TicketType],
[Ticket].[UserType],
[Ticket].[LaneId],
[Lane].[Number] As LaneNumber,
[Lane].[Name] As LaneName
FROM Ticket
JOIN [Player] ON [Ticket].UserId = [Player].[ID]
LEFT JOIN [PlayerLevel] ON [PlayerLevel].[ID] = [Ticket].[PlayerLevelId]
JOIN [GameType] ON [Ticket].[GameTypeId] = [GameType].[ID]
JOIN [Lane] ON [Lane].ID = [Ticket].[LaneId]
WHERE CONVERT(varchar(10), [Ticket].[CreationDate], 102)  = CONVERT(varchar(10), getdate(), 102)
GO
CREATE TABLE [Configuration] (
	ID bigint Primary KEY Identity,
	[Type] [bigint],
	TimePerShot int not null,
	TimeToRefill int not null,
	NumberOfSkeets int not null,  
	Config VARCHAR(MAX) not null
	FOREIGN KEY ([Type]) REFERENCES PlayerLevel(ID),
	)
GO

INSERT INTO  [Configuration] VALUES (1,10,10,1,'{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":[],"API":[]}],"ID":"1"}')
INSERT INTO  [Configuration] VALUES (2,10,10,1,'{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":[],"API":[]}],"ID":"2"}')
INSERT INTO  [Configuration] VALUES (3,10,10,1,'{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":[],"API":[]}],"ID":"3"}')
INSERT INTO  [Configuration] VALUES (null,10,10,1,'{"TimePerShot":10,"TimeToRefill":10,"Configurations":[{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":"","API":[]}]},{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":"","API":[]}]},{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":"","API":[]}]},{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":"","API":[]}]},{"TimePerShot":10,"TimeToRefill":10,"NumberOfSkeet":1,"Skeets":[{"SkeetID":"","API":[]}]}]}')
GO
CREATE TABLE [Skeet](
	ID bigint Primary KEY Identity,
	[Name] Varchar(250) not null UNIQUE,
	[API] Varchar(MAX) not null
)
GO
INSERT INTO [Skeet] VALUES ('s1','')
INSERT INTO [Skeet] VALUES ('s2','')
INSERT INTO [Skeet] VALUES ('s3','')
INSERT INTO [Skeet] VALUES ('s4','')
INSERT INTO [Skeet] VALUES ('s5','')
INSERT INTO [Skeet] VALUES ('s6','')
INSERT INTO [Skeet] VALUES ('s7','')
INSERT INTO [Skeet] VALUES ('s8','')
INSERT INTO [Skeet] VALUES ('s9','')
INSERT INTO [Skeet] VALUES ('s10','')
INSERT INTO [Skeet] VALUES ('LH','')
INSERT INTO [Skeet] VALUES ('HH','')

GO
CREATE VIEW [dbo].[X_AllTimePlayers] AS SELECT 
[Player].[ID] As UserId,
[Ticket].[ID] As TicketId,
[Player].[Photo],
[Player].[Name],
[Ticket].[CreationDate],
[Ticket].[State],
[PlayerLevel].[Name] AS PlayerLevel,
[GameType].[Name] as GameType,
[Ticket].[TicketType],
[Ticket].[UserType],
[Ticket].[LaneId] 
FROM Ticket
JOIN [Player] ON [Ticket].UserId = [Player].[ID]
JOIN [PlayerLevel] ON [PlayerLevel].[ID] = [Ticket].[PlayerLevelId]
JOIN [GameType] ON [Ticket].[GameTypeId] = [GameType].[ID] 

GO

CREATE VIEW [dbo].[X_Roles] AS SELECT 
	[Role].[ID] AS [RoleId],
    [Role].[Name] AS [Role],
    STRING_AGG([Screen].[Name], ',') AS [Screens]
FROM 
    [Permission]
JOIN 
    [Role] ON [Permission].[RoleId] = [Role].[ID]
JOIN 
    [Screen] ON [Permission].[ScreenId] = [Screen].[ID] 
GROUP BY 
    [Role].[Name],[Role].[ID]
GO

CREATE VIEW X_TicketForCompetition AS SELECT 
	[LaneId], Count(*) As [Count] FROM [ShootingAppDB].[dbo].[X_TodayPlayers] 
	Where [State] = 1 and [PlayerLevel] is null Group by(LaneId) 
GO