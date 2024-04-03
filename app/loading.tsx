import React from "react";
import Skeleton from "react-loading-skeleton";
import { Flex, Grid, Card, Table, Heading, Text } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
const HomePageLoading = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="5">
        <Flex gap="4">
          {["Open", "In Progress", "Closed"].map((label,index) => (
            <Card className="w-full" key={index}>
              <Flex  direction="column" gap="1">
              <Text className='text-sm font-medium'>{label}</Text>
                <Skeleton count={1} />
              </Flex>
            </Card>
          ))}
        </Flex>

        <Skeleton  height="20rem" />
      </Flex>
      <Card>
        <Heading size="4" mb="5">
          Latest Issues
        </Heading>
        <Table.Root>
          <Table.Body>
            {[1, 2, 3, 4, 5].map((issue, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton count={2} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Card>
    </Grid>
  );
};

export default HomePageLoading;
