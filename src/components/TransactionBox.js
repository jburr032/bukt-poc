import { useState } from 'react';
import {
  Text,
  Box,
  Flex,
  SimpleGrid,
  Avatar,
  IconButton,
  Input,
  InputRightElement,
  InputGroup,
  Tooltip,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FiEdit2 } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from 'react-icons/ai';

export default function TransactionBox({ t, username, isFeed = false }) {
  const [showCommentInput, setCommentInput] = useState(false);
  const [comment, setComment] = useState(t.comment);
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    setComment(data['tx_comment']);
    setCommentInput(false);
  };

  return (
    <Box borderBottom="0.5px solid #E2E8F0" padding="15px">
      <Flex>
        <Avatar
          size="md"
          name="Kent Dodds"
          src="https://bit.ly/kent-c-dodds"
          marginRight="13px"
        />
        <div style={{ width: '100%' }}>
          {showCommentInput && (
            <form
              style={{ marginBottom: '10px' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputGroup size="md">
                <Input
                  {...register('tx_comment')}
                  pr="4.5rem"
                  type="text"
                  placeholder="Transaction details"
                />
                <InputRightElement width="204px">
                  <div
                    style={{
                      marginRight: '13px',
                      width: '100%',
                      float: 'right',
                    }}
                  >
                    <IconButton
                      type="submit"
                      float="right"
                      h="23px"
                      minWidth="28px"
                      aria-label="Search database"
                      icon={<AiFillCheckCircle />}
                    />
                  </div>
                  <div style={{ float: 'right', marginRight: '13px' }}>
                    <IconButton
                      float="right"
                      h="23px"
                      minWidth="28px"
                      aria-label="Search database"
                      icon={<GrClose />}
                      onClick={() => setCommentInput(false)}
                    />
                  </div>
                </InputRightElement>
              </InputGroup>
            </form>
          )}
          {comment && !showCommentInput && (
            <Text marginBottom="10px">{comment}</Text>
          )}
          <Flex>
            <Text>{username}</Text>
            {!isFeed && !showCommentInput && (
              <div style={{ width: '100%', float: 'right' }}>
                <Flex float="right">
                  {comment ? (
                    <Tooltip label="Visible - remove status to hide tx">
                      <div style={{ paddingTop: '4px' }}>
                        <AiFillEye float="right" />
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip label="Not visible - give this tx a status">
                      <div style={{ paddingTop: '4px' }}>
                        <AiFillEyeInvisible float="right" />
                      </div>
                    </Tooltip>
                  )}

                  <IconButton
                    marginLeft="10px"
                    float="right"
                    h="23px"
                    minWidth="28px"
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<FiEdit2 />}
                    onClick={() => setCommentInput(prev => !prev)}
                  />
                </Flex>
              </div>
            )}
          </Flex>
          <Box>
            <SimpleGrid>
              <Text fontWeight="bold">Hash:</Text>
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {t.txHash}
              </Text>
            </SimpleGrid>
            <SimpleGrid>
              <Text fontWeight="bold">From:</Text>
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {t.src}
              </Text>
            </SimpleGrid>
            <SimpleGrid>
              <Text fontWeight="bold">To: </Text>
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {t.dst}
              </Text>
            </SimpleGrid>
            <Flex>
              <Text fontWeight="bold" marginRight="13px">
                Amount:{' '}
              </Text>
              <Text marginRight="13px">{t.txNumberSolTransfer}</Text>
              <Text fontWeight="bold" marginRight="13px">
                Fee:{' '}
              </Text>
              <Text>{t.fee}</Text>
            </Flex>
          </Box>
        </div>
      </Flex>
    </Box>
  );
}
