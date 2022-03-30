import { motion } from 'framer-motion'
import React, { useState } from 'react';
import { AiFillThunderbolt } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import { useAppSelector } from 'src/utils/hooks';
import { gql, useMutation, useApolloClient } from "@apollo/client";
import Confetti from "react-confetti";
import { Wallet_Service } from 'src/services';
import styles from './style.module.css'
import { useWindowSize } from '@react-hookz/web';
import { useConfirmVoteMutation, useVoteMutation } from 'src/graphql';

const defaultOptions = [
    { text: '100 sat', value: 100 },
    { text: '1k sat', value: 1000 },
    { text: '10k sats', value: 10000 },
]


enum PaymentStatus {
    DEFAULT,
    FETCHING_PAYMENT_DETAILS,
    PAID,
    AWAITING_PAYMENT,
    PAYMENT_CONFIRMED,
    NOT_PAID,
    CANCELED
}


interface Props extends ModalCard {
}

export default function VoteCard({ onClose, direction, ...props }: Props) {
    const { width, height } = useWindowSize()

    const { isWalletConnected, initVotes, projectId } = useAppSelector(state => ({
        isWalletConnected: state.wallet.isConnected,
        initVotes: state.vote.voteAmount,
        projectId: state.project.openId
    }));


    const [selectedOption, setSelectedOption] = useState(10);
    const [voteAmount, setVoteAmount] = useState<number>(initVotes ?? 10);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.DEFAULT);

    const [vote, { data }] = useVoteMutation({
        onCompleted: async (votingData) => {
            try {
                setPaymentStatus(PaymentStatus.AWAITING_PAYMENT);
                const webln = await Wallet_Service.getWebln()
                const paymentResponse = await webln.sendPayment(votingData.vote.payment_request);
                setPaymentStatus(PaymentStatus.PAID);
                confirmVote({
                    variables: {
                        paymentRequest: votingData.vote.payment_request,
                        preimage: paymentResponse.preimage
                    }
                })
            } catch (error) {
                console.log(error);
                setPaymentStatus(PaymentStatus.NOT_PAID);
            }

        },
        onError: (error) => {
            console.log(error);
            alert("Something wrong happened...")
            setPaymentStatus(PaymentStatus.NOT_PAID);
            setTimeout(() => {
                onClose?.();
            }, 4000);
        }
    });

    const [confirmVote, { data: confirmedVoteData }] = useConfirmVoteMutation({
        onCompleted: (votingData) => {
            setPaymentStatus(PaymentStatus.PAYMENT_CONFIRMED);
            setTimeout(() => {
                onClose?.();
            }, 4000);
        },

        onError: () => { }

    });

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(-1);
        setVoteAmount(Number(event.target.value));
    };

    const onSelectOption = (idx: number) => {
        setSelectedOption(idx);
        setVoteAmount(defaultOptions[idx].value);
    }

    const requestPayment = () => {
        setPaymentStatus(PaymentStatus.FETCHING_PAYMENT_DETAILS);
        vote({ variables: { "amountInSat": voteAmount, "projectId": projectId! } });
    }

    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className="modal-card max-w-[343px] p-24 rounded-xl relative"
        >
            <IoClose className='absolute text-body2 top-24 right-24 hover:cursor-pointer' onClick={onClose} />
            <h2 className='text-h5 font-bold'>Vote for this Project</h2>
            <div className="mt-32 ">
                <label className="block text-gray-700 text-body4 mb-2 ">
                    Enter Amount
                </label>
                <div className="input-wrapper">
                    <input
                        className={`input-field app ${styles.input}`}
                        value={voteAmount} onChange={onChangeInput}
                        type="number"
                        placeholder="e.g 5 sats" />
                    <p className='px-16 flex items-center text-primary-400'>
                        Sats
                    </p>
                </div>
                <div className="flex mt-16 justify-between">
                    {defaultOptions.map((option, idx) =>
                        <button
                            key={idx}
                            className={`btn border px-12 rounded-md py-8 text-body ${idx === selectedOption && "border-primary-500 bg-primary-100 hover:bg-primary-100 text-primary-600"}`}
                            onClick={() => onSelectOption(idx)}
                        >
                            {option.text}<AiFillThunderbolt className='inline-block text-thunder' />
                        </button>
                    )}
                </div>
                <p className="text-body6 mt-12 text-gray-500">1 sat = 1 vote</p>
                <p className="text-body6 mt-12 text-gray-500"><strong>Where do these sats go?</strong> <br /> Claimed project votes go directly towards the maker's. Unclaimed project votes go towards BOLT.FUN's community pool.</p>
                {paymentStatus === PaymentStatus.FETCHING_PAYMENT_DETAILS && <p className="text-body6 mt-12 text-yellow-500">Please wait while we the fetch payment details.</p>}
                {paymentStatus === PaymentStatus.NOT_PAID && <p className="text-body6 mt-12 text-red-500">You did not confirm the payment. Please try again.</p>}
                {paymentStatus === PaymentStatus.PAID && <p className="text-body6 mt-12 text-green-500">The invoice was paid! Please wait while we confirm it.</p>}
                {paymentStatus === PaymentStatus.AWAITING_PAYMENT && <p className="text-body6 mt-12 text-yellow-500">Waiting for your payment...</p>}
                {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <p className="text-body6 mt-12 text-green-500">Thanks for your vote</p>}
                <button className="btn btn-primary w-full mt-32" disabled={paymentStatus !== PaymentStatus.DEFAULT && paymentStatus !== PaymentStatus.NOT_PAID} onClick={requestPayment}>
                    {paymentStatus === PaymentStatus.DEFAULT || paymentStatus === PaymentStatus.NOT_PAID ? "Vote" : "Voting..."}
                </button>
            </div>
            {paymentStatus === PaymentStatus.PAYMENT_CONFIRMED && <Confetti width={width} height={height} />}
        </motion.div>
    )
}
