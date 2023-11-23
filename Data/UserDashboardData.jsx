export const UserDashboardData = [

  // {
  //   id: 2,
  //   type: 'Orders',
  //   tabs: [],
  // },
  // {
  //   id: 3,
  //   type: 'Wishlist',
  //   tabs: [],
  // },
  // {
  //   id: 4,
  //   type: 'Saved Address',
  //   head1: 'Save Address',
  //   btn: 'Add New Address',
  //   tabs: [
  //     {
  //       name: 'Mark Jugal',
  //       head: 'Home',
  //       add1: '549 Sulphur Springs Road',
  //       add2: 'Downers Grove, IL',
  //       add3: '60515',
  //       mobile: 'Mobile No. +1-123-456-7890',
  //       btn1: 'Edit',
  //       btn2: 'Remove',
  //     },
  //     {
  //       name: 'Method Zaki',
  //       head: 'Office',
  //       add1: '549 Sulphur Springs Road',
  //       add2: 'Downers Grove, IL',
  //       add3: '60515',
  //       mobile: 'Mobile No. +1-123-456-7890',
  //       btn1: 'Edit',
  //       btn2: 'Remove',
  //     },
  //     {
  //       name: 'Mark Jugal',
  //       head: 'Home',
  //       add1: '549 Sulphur Springs Road',
  //       add2: 'Downers Grove, IL',
  //       add3: '60515',
  //       mobile: 'Mobile No. +1-123-456-7890',
  //       btn1: 'Edit',
  //       btn2: 'Remove',
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   type: 'Payment',
  //   head: 'Card & Payment',
  //   btn: 'Add New Card',
  //   tabs: [
  //     {
  //       cardno: 'XXXX - XXXX - XXXX - 2548',
  //       valid: 'valid',
  //       thrr: 'thru',
  //       date: '12/23',
  //       sub: 'primary',
  //       name: 'mark jecno',
  //       image: 'payment-icon/1.jpg',
  //       btn1: 'edit',
  //       btn2: 'delete',
  //     },
  //     {
  //       cardno: 'XXXX - XXXX - XXXX - 1234',
  //       valid: 'valid',
  //       thrr: 'thru',
  //       date: '22/13',
  //       sub: 'primary',
  //       name: 'Rock Show',
  //       image: 'payment-icon/2.jpg',
  //       btn1: 'edit',
  //       btn2: 'delete',
  //       class: 'card-visa',
  //     },
  //     {
  //       cardno: 'XXXX - XXXX - XXXX - 5258',
  //       valid: 'valid',
  //       thrr: 'thru',
  //       date: '10/20',
  //       sub: 'primary',
  //       name: 'jack rock',
  //       image: 'payment-icon/3.jpg',
  //       btn1: 'edit',
  //       btn2: 'delete',
  //       class: 'dabit-card',
  //     },
  //   ],
  // },
  {
    id: 1,
    type: 'Edit Account',
    btn: 'Edit',
    tabs: [
      {
        id: 1,
        ques: 'Company Name',
        answ: 'test Fashion',
      },
      {
        id: 2,
        ques: 'Country / Region',
        answ: 'Downers Grove, IL',
      },
      {
        id: 3,
        ques: 'Year Established',
        answ: '2018',
      },
      {
        id: 4,
        ques: 'Total Employees',
        answ: '101 - 200 People',
      },
      {
        id: 5,
        ques: 'Category',
        answ: 'Clothing',
      },
      {
        id: 6,
        ques: 'Street Address',
        answ: '549 Sulphur Springs Road',
      },
      {
        id: 7,
        ques: 'City/State',
        answ: 'Downers Grove, IL',
      },
      {
        id: 8,
        ques: 'Zip',
        answ: '60515',
      },
    ],
    type1: 'Login Details',
    details: [
      {
        title: 'Email Address',
        detail: 'mark.jugal@gmail.com',
      },
      {
        title: 'Phone No.',
        detail: '+1-202-555-0198',
      },
      {
        title: 'Password',
        detail: '●●●●●●',
      },
    ],
  },
  {
    id: 2,
    type: 'Edit Address',
    tabs: [
      {
        title: 'My Dashboard',
        greet: 'Hello, ',
        name: 'MARK JECNO !',
        description:
            'From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.',
        orders: [
          {
            image1: 'svg/box.png',
            image2: 'svg/box1.png',
            title: 'total order',
            num: '3648',
          },
          {
            image1: 'svg/sent.png',
            image2: 'svg/sent1.png',
            title: 'pending orders',
            num: '215',
          },
          {
            image1: 'svg/wishlist.png',
            image2: 'svg/wishlist1.png',
            title: 'wishlist',
            num: '63874',
          },
        ],
        mainhead: 'Account Information',
        head1: 'Contact Information',
        btn: 'Edit',
        email: 'MARk-JECNO@gmail.com',
        password: 'Change Password',
        head2: 'Newsletters',
        info: 'You are currently not subscribed to any newsletter.',
        head3: 'Address Book',
        subhead: 'Manage Addresses',
        billing: 'Default Billing Address',
        billinginfo: 'You have not set a default billing address.',
        btn2: 'Edit Address',
        shipping: 'Default Shipping Address',
        shippinginfo: 'You have not set a default shipping address.',
      },
    ],
  },
  {
    id: 3,
    type: 'Change Password',
    head: 'Delete Your Account',
    greet: 'Hi ',
    name: ' Mark Enderess,',
    message: 'We Are Sorry To Here You Would Like To Delete Your Account.',
    head2: 'Note',
    description1:
      'Deleting your account will permanently remove your profile,personal settings, and all other associated information. Once your account is deleted, You will be logged out and will be unable to log back in.',
    description2: 'If you understand and agree to the above statement, and would still like to delete your account, than click below',
    btn: 'Delete Your Account',
  },
];
