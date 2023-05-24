<template>
  <div class="Component">
    <NuxtLink :to="'/nft/' + nft.contractTxId" class="Card">
      <Graphic :nft="nft" />
      <div class="Buttons">
        <button v-if="disposable" @click.prevent.stop="$emit('remove-item', nft.contractTxId)" class="nft-button">
          ✕
        </button>
      </div>
      <div class="Info">
        <div class="Row">
          <h4 class="Nft Name Detail">
            {{ nft.state.name || "-no title-" }}
          </h4>
          <span class="Nft Rarity">
            <!-- <span>
              0
            </span>
            <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEUElEQVR4nO1ZS4hcVRC9MQpqYqILUYKfhdGoKMZMXPgBV+LGD6JBsxEXookfXCXjQomiglslfkmCMQE3JrrTZKLLIEpQEYxkYf4zXfU6PTPdVW9G0RypN3VnGrs7/Z3OG+gDD6an7jv31a2q+zk3hAEGGGCAAfKMZBKrSDDMigOkOMwCYcE0KUZZMcKC15Iybm6Vr1jGLSx43d7NOATTxplx2/8Em3kaN/XOAcVaUnzHCjR7SHCWFd+SYHUjPhbc6W3OtsLJigOJYqhjBwBcxIKtsUNSnCHFtkTxiEVnDFhyFLj4TIprE8XDLPiIFCV36B9SvAlgcRXfYlK8bbbIx4IPWfCQcRjXGLDEuAuKR0mxPWsTB0jwPoAL23JiYgJXkOL7bEQESoq3ikUsa/ZekuAyUryRpcnMaH5uDrgTu53PUmiLtW3GVyximTnPgjRGZ3wcl7cciegECU5YKoQ2YalFguM+8rurnDhGgjva5UsUQyQ4GZ1pKTKWTtGJRLEidIjRFNdnAzFXP8dLKa7rlC9RrIjOkOC9Zo3Xej5qJ5GowzfkqWTPmm75WLDG0owE/56TL85OVhPddjrLKdhsT8/4FO94lEfqNrDZIs4mrRR2q4jF3iu+UgnL4+zI07ixpgEJXnVHtoWcgxU7vFY21TOOmNHm8JBzFBSPeXrtrzGS4Ejm5RRWhpwjmSuDP2qMLKhkRmBpyDkIWOrrUqXGGFdP2yqEnOM0cGncddQYSXDajN0sgv1CUXGNF/vJGiMrfnVHOt9p9gmJ4i4v9l9qjKzY5bPWhpBzkOJFd+SzesaX3Lgz5Bzsg06KF+qf2GaM43ku+BPAJaSYzMpgEqvqNiLFoSwqKdaFnIJTPOWF/mPDRqR42aNyCMCikDMAWMSKn/0bNzYL26g3fDzkDKR4wqNxqmn6x6K3Odp2miEnKNmuV3CqYZH/H3aMJMFPPoPtCDkBK3b6av5Dy8eCQgW3RwEhUTwfzjNIsdGdmCqWcWtbL7PgWU+xvwoVPBDOE0jwoH2Df8szHZFEISJTAFPcE/oMSnFfph+0IjicC5keJfgiOtPPyHCK+0lR9r6/7Pq47Irj1zFHOcX6MM/gFOuzvmb63GPf0BNiVwq3z2pUik/ali9b7IcV71bpwrt63o+tqiaHZprSTCffmLTaK37jYsU+rwfTrbbM6+7CBGtSTHjY/yykuLtbTkpxLwuOxk2rCdu9+dpmHU9hJSt+i8q7pUMneeyL7zAJ/nYnDtsuPPRbACDFp7P3GIKDNIUb2hoMwcF4bUCCj+1aYX6/uvmClZ33XZcdBnBBo/aW94niuajasILsziXkAaNlXMmCvVW3TPtMIGggGuyviuIeezfkDZxiHSsSz/cJTvFktJmCyYpiLGiLSsgzSHA1C76qGvWtLPig6vfeQgVXhYUCEjyd3fzOOWAr9SthIWKsgttI8bs99ndYyCiVsDxPJ80BQp/wH2RN1davrsprAAAAAElFTkSuQmCC"
              alt="RareWeave"
              width="20"
              height="20"
            /> -->
          </span>
        </div>
        <div class="Row">
          <span class="Nft Owner Detail" v-if="nft.owner">
            Owned:&nbsp;
            <NuxtLink :to="'/profile/' + nft.owner.address" class="Nft Link">
              {{ nft.owner.ansName || nft.owner.account?.handle }}
            </NuxtLink>
          </span>
        </div>
        <div :class="{
          'Row --forSale': nft.state.forSale,
          'Row': !nft.state.forSale
        }">
          <div class="Nft Price">
            <span class="Nft Split">
              <span class="Icon">
                <span class="AR">
                  {{ nft.state.listingDenom || "a" }}
                </span>
              </span>
              <span class="Nft PriceInAr" v-if="nft.state.forSale">
                {{ (nft.state.price / 1e12).toFixed(2) }} {{ nft.state.listingDenom || "AR" }}
              </span>
            </span>
          </div>
          <span class="Nft Buy Btn" v-if="nft.state.forSale">
            Buy now
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
const { nft, disposable } = defineProps([
  "nft",
  "disposable"
]);
</script>
<style scoped>
.Component {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.Card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 286px;
  height: 398px;
  background-color: rgba(17, 23, 32, 1);
  margin: 6px 9px 18px;
  padding: 0;
  box-sizing: content-box;
  border: 1px solid rgba(43, 56, 68, .33);
  border-radius: 8px;
  box-shadow:
    0px 1px 1px rgba(0, 0, 0, 0.17),
    1px 2px 2px rgba(0, 0, 0, 0.17),
    2px 4px 4px rgba(0, 0, 0, 0.17),
    4px 8px 8px rgba(0, 0, 0, 0.17),
    8px 16px 16px rgba(0, 0, 0, 0.17),
    16px 32px 32px rgba(0, 0, 0, 0.17);
  text-shadow:
    0px 1px 1px rgba(0, 0, 0, 0.17),
    1px 2px 2px rgba(0, 0, 0, 0.17),
    2px 4px 4px rgba(0, 0, 0, 0.17),
    4px 8px 8px rgba(0, 0, 0, 0.17),
    8px 16px 16px rgba(0, 0, 0, 0.17);
}

.Card::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc((100%) + (2 * 2px));
  height: calc((100%) + (2 * 2px));
  background: radial-gradient(ellipse at center,
      rgba(17, 23, 32, 0),
      rgba(17, 23, 32, 0)) !important;
  border-radius: 6px;
  z-index: -1;
  background-size: 200% 200%;
}

.Card:hover {
  /* border: 1px solid rgba(255, 255, 255, 0); */
  box-shadow:
    0px 1px 1px rgba(0, 0, 0, 0.17),
    1px 2px 2px rgba(0, 0, 0, 0.17),
    2px 4px 4px rgba(0, 0, 0, 0.17),
    4px 8px 8px rgba(0, 0, 0, 0.17),
    8px 16px 16px rgba(0, 0, 0, 0.17),
    16px 32px 32px rgba(0, 0, 0, 0.17);
  background-color: rgba(17, 23, 32, 1);
}

/* 
.Component:hover .Card::after {
  background: conic-gradient(
    rgba(236, 236, 236, 0.333),
    rgba(236, 236, 236, 0.666),
    rgba(252, 252, 252, 0.333),
    rgba(236, 236, 236, 0.666),
    rgba(252, 252, 252, 0.333),
    rgba(236, 236, 236, 0.666),
    rgba(252, 252, 252, 0.333)
  ) !important;
} */

.--forSale:hover {
  /* background: linear-gradient(93deg, rgba(129,234,174,1), rgb(9, 192, 238)); */
  background: linear-gradient(93deg,
      rgb(158 19 131),
      rgb(238 129 9));
  /* background: rgb(214 116 8); */
}

.Imagewrapper {
  max-height: 286px;
  border-radius: 8px 8px 0 0;
}

.Buttons {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  margin: 0.5em 1em;
}

.Info {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  margin: 3px 0;
  padding: 0;
  box-sizing: border-box;
}

.Row {
  display: flex;
  margin: 0;
  padding: .25em;
  height: 40px;
}

.Row:nth-last-child(1) {
  margin-top: -12px;
  justify-content: space-between;
  border-radius: 0 0 8px 8px;
}

.Nft {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  transition: .36s ease-in-out;
}

.Nft.Detail {
  height: 32px;
  padding: 0 12px;
  font-size: 12pt;
  font-weight: 600;
  font-family: 'Arimo', sans-serif;
  color: rgba(251, 250, 255, 1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.Nft.Rarity {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
}

.Nft.Name {
  justify-content: flex-start;
  flex: 1 1 0px;
  text-align: left;
}

.Nft.Owner {
  justify-content: flex-start;
  flex: 1 1 0px;
  max-width: 80%;
  text-align: left;
  padding: 0 12px 12px;
}

.Link {
  color: rgba(221, 232, 255, 0.5) !important;
  text-decoration: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.Link:hover {
  color: rgba(251, 250, 255, .5);
  text-decoration: 1px underline !important;
}

.Nft.Price {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 0px;
  padding: 0 14px 0 10px;
}

.Split {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 0px;
  padding: 0;
}

.Icon {
  flex: 0 0 32px;
  height: 32px;
  margin-left: -2px;
  margin-right: 6px;
}

.Buy {
  flex: 0 0 max-content;
  padding: 0 12px;
}
</style>