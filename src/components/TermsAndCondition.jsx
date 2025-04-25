import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { useNavigate } from 'react-router-dom';
// import tnc_dump from './tnc_data'
import './tnc.css';

const tnc_dump = {
  "Bank of America Customized Cash Rewards Credit Card": [
    "Introductory 0% APR on purchases and balance transfers for the first 15 statement closing dates.",
    "After the intro period, Purchase and Balance Transfer APR will be 18.24% to 28.24%, based on creditworthiness and market Prime Rate.",
    "Cash Advance APR ranges from 21.24% to 28.24%, and Penalty APR can be up to 29.99%.",
    "Penalty APR applies indefinitely for late payments.",
    "No annual fee.",
    "Balance Transfer Fee: 3% (introductory for 60 days), then 4%.",
    "Cash Advance Fees: 4% or 5% of the amount, depending on the type.",
    "Late Payment Fee: up to $40.",
    "Earn 1% base cash rewards on all net purchases.",
    "Earn a total of 2% cash back in a chosen category from a list.",
    "Earn a total of 3% cash back on gas and EV charging stations and online shopping (up to $2,500 in combined choice category/gas and EV charging station purchases each quarter)."
  ],
  "Bank of America Customized Cash Rewards credit card": [
    "Introductory 0% APR on purchases and balance transfers for the first 15 statement closing dates.",
    "After the intro period, Purchase and Balance Transfer APR will be 18.24% to 28.24%, based on creditworthiness and market Prime Rate.",
    "Cash Advance APR ranges from 21.24% to 28.24%, and Penalty APR can be up to 29.99%.",
    "Penalty APR applies indefinitely for late payments.",
    "No annual fee.",
    "Balance Transfer Fee: 3% (introductory for 60 days), then 4%.",
    "Cash Advance Fees: 4% or 5% of the amount, depending on the type.",
    "Late Payment Fee: up to $40.",
    "Earn 1% base cash rewards on all net purchases.",
    "Earn a total of 2% cash back in a chosen category from a list.",
    "Earn a total of 3% cash back on gas and EV charging stations and online shopping (up to $2,500 in combined choice category/gas and EV charging station purchases each quarter)."
  ],
  "Capital One Platinum Credit Card": [
    "Purchase and Transfer APR: 29.74%, varies with the market Prime Rate.",
    "Cash Advance APR: 29.74%, varies with the market Prime Rate.",
    "No annual fee.",
    "Transfer Fee: 4% of the transferred balance at a promotional APR. No fee for transfers at the Transfer APR.",
    "Cash Advance Fee: greater of $5 or 5% of the advance.",
    "Late Payment Fee: up to $40.",
    "Interest is charged on new purchases if the previous balance was not paid in full by the due date.",
    "Interest begins accruing on cash advances and transfers from the transaction date.",
    "Minimum payment is the greater of $25 or 1% of the balance plus new interest and late payment fees, plus any past due amount.",
    "Can change account terms as permitted by law with notice."
  ],
  "Capital One Platinum Secured Credit Card": [
    "Purchase and Transfer APR: 29.74%, varies with the market Prime Rate.",
    "Cash Advance APR: 29.74%, varies with the market Prime Rate.",
    "No annual fee.",
    "Requires a security deposit of $49, $99, or $200.",
    "Minimum initial credit line is $200, maximum ranges from $500 to $1,000 based on creditworthiness.",
    "Transfer Fee: 4% of the transferred balance at a promotional APR [14]. No fee for transfers at the Transfer APR.",
    "Cash Advance Fee: greater of $5 or 5% of the advance.",
    "Late Payment Fee: up to $40.",
    "Interest is charged on new purchases if the previous balance was not paid in full by the due date.",
    "Interest begins accruing on cash advances and transfers from the transaction date."
  ],
  "Chase Sapphire Preferred credit card": [
    "0% introductory APR on purchases and transfers for the first 15 months.",
    "After the intro period, Purchase and Transfer APR will be 19.24%, 25.24%, or 29.24%, based on creditworthiness and market Prime Rate.",
    "Cash Advance APR: 29.24%, varies with the market Prime Rate.",
    "No annual fee.",
    "Introductory Transfer Fee: 3% during the first 15 months. After that, 4% for promotional APR transfers. No fee for transfers at the Purchase APR after the intro period.",
    "Cash Advance Fee: greater of $5 or 5% of the advance.",
    "Late Payment Fee: up to $40.",
    "Earn 1.5% cash back on all other purchases.",
    "Earn 5% cash back on hotels and rental cars booked through Capital One Travel.",
    "Rewards do not expire as long as the account is open."
  ],
  "Platinum Card from American Express": [
    "Purchase and Transfer APR: 29.74%, varies with the market Prime Rate.",
    "Cash Advance APR: 29.74%, varies with the market Prime Rate.",
    "Annual Fee: $39.",
    "Transfer Fee: 4% of the transferred balance at a promotional APR. No fee for transfers at the Transfer APR.",
    "Cash Advance Fee: greater of $5 or 5% of the advance.",
    "Late Payment Fee: up to $40.",
    "Earn 1.5% cash back on all other purchases.",
    "Earn 5% cash back on hotels and rental cars booked through Capital One Travel.",
    "Rewards do not expire as long as the account is open.",
    "Minimum payment includes a portion of the annual membership fee divided by 12."
  ],
  "Chase Freedom Unlimited with Ultimate Rewards": [
    "Earn 1.5% Cash Back rewards on each $1 spent.",
    "Earn 5% total Cash Back rewards on purchases made through Chase Travel.",
    "Earn 3% Cash Back rewards on dining at restaurants, drugstores, and travel purchased through Chase Ultimate Rewards.",
    "Cash Back rewards are tracked as points, with $1 in Cash Back equal to 100 points.",
    "No annual fee mentioned.",
    "Points are generally worth $0.01 (one cent) when redeemed for cash, gift cards, and travel .",
    "Balance transfers, cash advances, and fees do not earn points.",
    "We may change the program and terms with notice.",
    "Points can be combined with other eligible Chase cards with Ultimate Rewards.",
    "Points may be lost for misuse, account closure, or other reasons specified in the agreement."
  ],
  "Chase Sapphire Preferred": [
    "Purchase APR: 19.99% to 28.24%, varies with market Prime Rate.",
    "Balance Transfer APR: 19.99% to 28.24%, varies with market Prime Rate.",
    "Cash Advance APR: 29.24%, varies with market Prime Rate.",
    "Penalty APR: up to 29.99%, may apply for late or returned payments and could remain indefinitely.",
    "Balance Transfer Fee: greater of $5 or 5% of the amount. Note: Account may not be eligible for balance transfers.",
    "Cash Advance Fee: greater of $10 or 5% of the amount.",
    "Foreign Transaction Fee: Nil.",
    "Late Payment Fee: Up to $40.",
    "Minimum due date is 21 days after the close of each billing cycle.",
    "Interest charged on balance transfers and cash advances from the transaction date."
  ],
  "Credit One Bank Platinum": [
    "Purchase APR: 29.49%, varies with the market Prime Rate.",
    "Cash Advance APR: 29.49%, varies with the market Prime Rate.",
    "Annual Fee: $39, billed upon account opening and annually thereafter . Refundable if account is canceled before any transactions are made .",
    "Cash Advance Fee: greater of $5 or 8% of the amount.",
    "Foreign Transaction Fee: greater of $1 or 3% of each purchase in a foreign currency .",
    "Late Payment Fee: up to $39.",
    "Returned Payment Fee: up to $39 .",
    "Minimum interest charge if interest is applied is $1.00.",
    "Earn 1% cash back as an automatic statement credit on net eligible purchases in specific categories (gasoline, grocery, mobile phone service, internet, cable and satellite TV service).",
    "Card Agreement includes an arbitration provision that limits ability to have claims heard in court or participate in class actions."
  ],

  "Amazon Prime Visa": [
    "Purchase APR: 29.49%, varies with the market Prime Rate.",
    "Cash Advance APR: 29.49%, varies with the market Prime Rate.",
    "Annual Fee: $39, billed upon account opening and annually thereafter . Refundable if account is canceled before any transactions are made .",
    "Cash Advance Fee: greater of $5 or 8% of the amount.",
    "Foreign Transaction Fee: greater of $1 or 3% of each purchase in a foreign currency .",
    "Late Payment Fee: up to $39.",
    "Returned Payment Fee: up to $39 .",
    "Minimum interest charge if interest is applied is $1.00.",
    "Earn 1% cash back as an automatic statement credit on net eligible purchases in specific categories (gasoline, grocery, mobile phone service, internet, cable and satellite TV service).",
    "Card Agreement includes an arbitration provision that limits ability to have claims heard in court or participate in class actions."
  ],

  "":["",""]
}

export default function TermsAndCondition({ onBack, cc_name="" }) {

  const navigate = useNavigate();
  const handleBackButton = () => {
      navigate('/');
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: 'auto' }}>

      <Box display="flex" alignItems="center" gap={2} sx={{flexDirection:"column"}}>
        <div className="tnc_header"   >
        <DonutLargeIcon sx={{ fontSize: 40, color: '#008500' }} className="tnc_icn"/>

        <Box className="tnc_header_txt">
          <Typography fontWeight="bold" variant="h6" alignItems="center">Terms & Conditions</Typography>
        </Box>
        </div>
        <Box>
          <ol className="list-decimal pl-6 space-y-2 tnc_point_body" >
          {tnc_dump[cc_name].map((detail, index) => (
            <li key={index} className="tnc_point">{detail}</li>
          ))}
        </ol>
        </Box>
      </Box>
   </Box>
  );
}

